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

export const lacGalleryRoutes = Router();

// ── Public: list groups with their images ─────────────────────────────────────

lacGalleryRoutes.get(
  '/groups',
  asyncHandler(async (_req: Request, res: Response) => {
    const groups = await prisma.lacGroup.findMany({
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

lacGalleryRoutes.use(authenticate, requireRole(ROLES.ADMIN, ROLES.EDITOR));

// ── Create group ──────────────────────────────────────────────────────────────

lacGalleryRoutes.post(
  '/groups',
  asyncHandler(async (req: Request, res: Response) => {
    const { name, description, theme, themeColor } = req.body as { name?: string; description?: string; theme?: string; themeColor?: string };
    if (!name?.trim()) throw new ValidationError('Group name is required.');

    const maxOrder = await prisma.lacGroup.aggregate({ _max: { order: true } });
    const nextOrder = (maxOrder._max.order ?? -1) + 1;
    const keyPrefix = `lac-gallery/${randomUUID()}/`;

    const group = await prisma.lacGroup.create({
      data: { name: name.trim(), description: (description ?? '').trim(), theme: (theme ?? '').trim(), themeColor: (themeColor ?? '').trim(), keyPrefix, order: nextOrder },
    });
    ok(res, { ...group, images: [] }, 201);
  }),
);

// ── Update group ──────────────────────────────────────────────────────────────

lacGalleryRoutes.patch(
  '/groups/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { name, description, theme, themeColor } = req.body as { name?: string; description?: string; theme?: string; themeColor?: string };
    if (!name?.trim()) throw new ValidationError('Group name is required.');

    const group = await prisma.lacGroup.findUnique({ where: { id } });
    if (!group) throw new NotFoundError('Group not found.');

    const updated = await prisma.lacGroup.update({
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

lacGalleryRoutes.delete(
  '/groups/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const group = await prisma.lacGroup.findUnique({ where: { id } });
    if (!group) throw new NotFoundError('Group not found.');

    await deletePrefix(group.keyPrefix);
    await prisma.lacGroup.delete({ where: { id } });
    ok(res, { id });
  }),
);

// ── Upload image to a group ───────────────────────────────────────────────────

lacGalleryRoutes.post(
  '/groups/:id/upload',
  upload.single('file'),
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const group = await prisma.lacGroup.findUnique({ where: { id } });
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

    const created = await prisma.lacImage.create({
      data: { groupId: id, key, name: '', description: '' },
    });
    await prisma.lacImage.update({ where: { id: created.id }, data: { name: created.id } });

    ok(res, { id: created.id, name: created.id, description: '', url }, 201);
  }),
);

// ── Update image metadata ─────────────────────────────────────────────────────

lacGalleryRoutes.patch(
  '/image/:imageId',
  asyncHandler(async (req: Request, res: Response) => {
    const imageId = req.params.imageId as string;
    const { name, description } = req.body as { name?: string; description?: string };

    const image = await prisma.lacImage.findUnique({ where: { id: imageId } });
    if (!image) throw new NotFoundError('Image not found.');

    const updated = await prisma.lacImage.update({
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

lacGalleryRoutes.delete(
  '/image/:imageId',
  asyncHandler(async (req: Request, res: Response) => {
    const imageId = req.params.imageId as string;
    const image = await prisma.lacImage.findUnique({ where: { id: imageId } });
    if (!image) throw new NotFoundError('Image not found.');

    await deleteByPath(image.key);
    await prisma.lacImage.delete({ where: { id: imageId } });
    ok(res, { id: imageId });
  }),
);
