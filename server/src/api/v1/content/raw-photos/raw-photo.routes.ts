import { Router, type Request, type Response } from 'express';
import multer from 'multer';
import { randomUUID } from 'crypto';
import { imageSize } from 'image-size';
import { asyncHandler } from '../../../../common/utils/asyncHandler.js';
import { ok } from '../../../../common/utils/apiResponse.js';
import { ValidationError, NotFoundError } from '../../../../common/errors/AppError.js';
import { authenticate } from '../../../../middlewares/auth.middleware.js';
import { requireRole } from '../../../../middlewares/rbac.middleware.js';
import { ROLES } from '../../../../common/constants/roles.js';
import { uploadBuffer, deleteByPath, getPathFromPublicUrl } from '../../../../common/services/storage.service.js';
import { prisma } from '../../../../config/database.js';

const MAX_SIZE_MB = 10;
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const EXT_BY_MIME: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_SIZE_MB * 1024 * 1024 },
});

export const rawPhotoRoutes = Router();

rawPhotoRoutes.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const { section } = req.query;
    const photos = await prisma.rawPhoto.findMany({
      where: section ? { section: section as string } : undefined,
      orderBy: { uploadedAt: 'desc' },
    });
    ok(res, photos);
  }),
);

rawPhotoRoutes.use(authenticate, requireRole(ROLES.ADMIN, ROLES.EDITOR));

rawPhotoRoutes.post(
  '/upload',
  upload.array('files', 20),
  asyncHandler(async (req: Request, res: Response) => {
    const section = (req.body.section as string | undefined)?.trim();
    if (!section) throw new ValidationError('section is required');

    const files = req.files as Express.Multer.File[] | undefined;
    if (!files || files.length === 0) throw new ValidationError('No files uploaded.');

    const results = [];

    for (const file of files) {
      if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        throw new ValidationError(`Unsupported format for "${file.originalname}". Use JPG, PNG, or WebP.`);
      }

      try {
        imageSize(file.buffer);
      } catch {
        throw new ValidationError(`Could not read image data for "${file.originalname}".`);
      }

      const ext = EXT_BY_MIME[file.mimetype] ?? 'jpg';
      const drivePath = `raw-photos/${section}/${randomUUID()}.${ext}`;
      const url = await uploadBuffer(drivePath, file.buffer, file.mimetype);

      const photo = await prisma.rawPhoto.create({
        data: { section, url, filename: file.originalname, caption: '' },
      });

      results.push(photo);
    }

    ok(res, results, 201);
  }),
);

rawPhotoRoutes.patch(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const caption = typeof req.body.caption === 'string' ? req.body.caption : '';
    let photo;
    try {
      photo = await prisma.rawPhoto.update({ where: { id }, data: { caption } });
    } catch {
      throw new NotFoundError('Photo not found');
    }
    ok(res, photo);
  }),
);

rawPhotoRoutes.delete(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    let photo;
    try {
      photo = await prisma.rawPhoto.delete({ where: { id } });
    } catch {
      throw new NotFoundError('Photo not found');
    }
    const fileId = getPathFromPublicUrl(photo.url);
    if (fileId) await deleteByPath(fileId);
    ok(res, photo);
  }),
);
