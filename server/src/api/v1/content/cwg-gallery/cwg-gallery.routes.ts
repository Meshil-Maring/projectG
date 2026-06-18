import { Router, type Request, type Response } from 'express';
import multer from 'multer';
import { randomUUID } from 'crypto';
import { asyncHandler } from '../../../../common/utils/asyncHandler.js';
import { ok } from '../../../../common/utils/apiResponse.js';
import { ValidationError, NotFoundError } from '../../../../common/errors/AppError.js';
import { authenticate } from '../../../../middlewares/auth.middleware.js';
import { requireRole } from '../../../../middlewares/rbac.middleware.js';
import { ROLES } from '../../../../common/constants/roles.js';
import { prisma } from '../../../../config/database.js';
import { deleteByPath, deletePrefix, uploadToFolder, publicUrl } from '../../../../common/services/storage.service.js';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const EXT_BY_MIME: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

export const cwgGalleryRoutes = Router();

// ── Public: list groups with their images ─────────────────────────────────────

cwgGalleryRoutes.get(
  '/groups',
  asyncHandler(async (_req: Request, res: Response) => {
    const groups = await prisma.cwgGroup.findMany({
      orderBy: { order: 'asc' },
      include: { images: { orderBy: { uploadedAt: 'desc' } } },
    });
    ok(res, groups.map((g) => ({
      id: g.id,
      name: g.name,
      order: g.order,
      description: g.description,
      theme: g.theme,
      themeColor: g.themeColor,
      images: g.images.map((img) => ({
        id: img.id,
        name: img.name,
        description: img.description,
        url: publicUrl(img.key),
      })),
    })));
  }),
);

// ── Auth required from here ───────────────────────────────────────────────────

cwgGalleryRoutes.use(authenticate, requireRole(ROLES.ADMIN, ROLES.EDITOR));

// ── Create group ──────────────────────────────────────────────────────────────

cwgGalleryRoutes.post(
  '/groups',
  asyncHandler(async (req: Request, res: Response) => {
    const { name, description, theme, themeColor } = req.body as { name?: string; description?: string; theme?: string; themeColor?: string };
    if (!name?.trim()) throw new ValidationError('Group name is required.');

    const maxOrder = await prisma.cwgGroup.aggregate({ _max: { order: true } });
    const nextOrder = (maxOrder._max.order ?? -1) + 1;
    const keyPrefix = `cwg-gallery/${randomUUID()}/`;

    const group = await prisma.cwgGroup.create({
      data: { name: name.trim(), description: (description ?? '').trim(), theme: (theme ?? '').trim(), themeColor: (themeColor ?? '').trim(), keyPrefix, order: nextOrder },
    });
    ok(res, { ...group, images: [] }, 201);
  }),
);

// ── Update group ──────────────────────────────────────────────────────────────

cwgGalleryRoutes.patch(
  '/groups/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { name, description, theme, themeColor } = req.body as { name?: string; description?: string; theme?: string; themeColor?: string };
    if (!name?.trim()) throw new ValidationError('Group name is required.');

    const group = await prisma.cwgGroup.findUnique({ where: { id } });
    if (!group) throw new NotFoundError('Group not found.');

    const updated = await prisma.cwgGroup.update({
      where: { id },
      data: {
        name: name.trim(),
        ...(description !== undefined && { description: description.trim() }),
        ...(theme !== undefined && { theme: theme.trim() }),
        ...(themeColor !== undefined && { themeColor: themeColor.trim() }),
      },
    });
    ok(res, updated);
  }),
);

// ── Delete group ──────────────────────────────────────────────────────────────

cwgGalleryRoutes.delete(
  '/groups/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const group = await prisma.cwgGroup.findUnique({ where: { id } });
    if (!group) throw new NotFoundError('Group not found.');

    await deletePrefix(group.keyPrefix);
    await prisma.cwgGroup.delete({ where: { id } });
    ok(res, { id });
  }),
);

// ── Upload image to a group ───────────────────────────────────────────────────

cwgGalleryRoutes.post(
  '/groups/:id/upload',
  upload.single('file'),
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const group = await prisma.cwgGroup.findUnique({ where: { id } });
    if (!group) throw new NotFoundError('Group not found.');

    const file = req.file;
    if (!file) throw new ValidationError('No file uploaded.');
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new ValidationError('Unsupported format. Use JPG, PNG, or WebP.');
    }

    const ext = EXT_BY_MIME[file.mimetype] ?? 'jpg';
    const filename = `${randomUUID()}.${ext}`;
    const imagesPrefix = `${group.keyPrefix}images/`;
    const { key, url } = await uploadToFolder(imagesPrefix, file.buffer, file.mimetype, filename);

    const created = await prisma.cwgImage.create({
      data: { groupId: id, key, name: '', description: '' },
    });
    await prisma.cwgImage.update({ where: { id: created.id }, data: { name: created.id } });

    ok(res, { id: created.id, name: created.id, description: '', url }, 201);
  }),
);

// ── Update image metadata ─────────────────────────────────────────────────────

cwgGalleryRoutes.patch(
  '/image/:imageId',
  asyncHandler(async (req: Request, res: Response) => {
    const { imageId } = req.params;
    const { name, description } = req.body as { name?: string; description?: string };

    const image = await prisma.cwgImage.findUnique({ where: { id: imageId } });
    if (!image) throw new NotFoundError('Image not found.');

    const updated = await prisma.cwgImage.update({
      where: { id: imageId },
      data: {
        name: (name ?? image.name).trim(),
        description: (description ?? image.description).trim(),
      },
    });

    ok(res, { id: updated.id, name: updated.name, description: updated.description, url: publicUrl(updated.key) });
  }),
);

// ── Delete an image ───────────────────────────────────────────────────────────

cwgGalleryRoutes.delete(
  '/image/:imageId',
  asyncHandler(async (req: Request, res: Response) => {
    const { imageId } = req.params;
    const image = await prisma.cwgImage.findUnique({ where: { id: imageId } });
    if (!image) throw new NotFoundError('Image not found.');

    await deleteByPath(image.key);
    await prisma.cwgImage.delete({ where: { id: imageId } });
    ok(res, { id: imageId });
  }),
);
