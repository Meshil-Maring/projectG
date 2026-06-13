import { Router, type Request, type Response } from 'express';
import multer from 'multer';
import { z } from 'zod';
import { asyncHandler } from '../../../../common/utils/asyncHandler.js';
import { ok } from '../../../../common/utils/apiResponse.js';
import { ValidationError } from '../../../../common/errors/AppError.js';
import { validate } from '../../../../middlewares/validate.middleware.js';
import { authenticate } from '../../../../middlewares/auth.middleware.js';
import { requireRole } from '../../../../middlewares/rbac.middleware.js';
import { ROLES } from '../../../../common/constants/roles.js';
import { IMAGE_SPECS, IMAGE_SPEC_KEYS, MAX_UPLOAD_SIZE_MB } from './image.config.js';
import { fetchImageBuffer, storeValidatedImage, validateImageBuffer } from './image.service.js';

export const imageRoutes = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_UPLOAD_SIZE_MB * 1024 * 1024 },
});

const specKeySchema = z.enum(IMAGE_SPEC_KEYS as [string, ...string[]]);

const fromUrlSchema = z.object({
  url: z.string().url(),
  key: specKeySchema,
  replace: z.string().optional(),
});

const uploadBodySchema = z.object({
  key: specKeySchema,
  replace: z.string().optional(),
});

imageRoutes.use(authenticate, requireRole(ROLES.ADMIN, ROLES.EDITOR));

imageRoutes.post(
  '/upload',
  upload.single('file'),
  asyncHandler(async (req: Request, res: Response) => {
    const parsed = uploadBodySchema.safeParse(req.body);
    if (!parsed.success) {
      throw new ValidationError('Invalid request body', parsed.error.flatten().fieldErrors);
    }
    if (!req.file) {
      throw new ValidationError('No file uploaded.');
    }

    const spec = IMAGE_SPECS[parsed.data.key as keyof typeof IMAGE_SPECS];
    validateImageBuffer(req.file.buffer, spec);
    const result = await storeValidatedImage(req.file.buffer, req.file.mimetype, spec, parsed.data.replace);
    ok(res, result, 201);
  }),
);

imageRoutes.post(
  '/from-url',
  validate({ body: fromUrlSchema }),
  asyncHandler(async (req: Request, res: Response) => {
    const { url, key, replace } = req.body as z.infer<typeof fromUrlSchema>;
    const spec = IMAGE_SPECS[key as keyof typeof IMAGE_SPECS];

    const { buffer, contentType } = await fetchImageBuffer(url);
    validateImageBuffer(buffer, spec);
    const result = await storeValidatedImage(buffer, contentType, spec, replace);
    ok(res, result, 201);
  }),
);
