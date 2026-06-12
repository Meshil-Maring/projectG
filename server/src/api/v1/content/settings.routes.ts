import { Router, type Request, type Response } from 'express';
import { asyncHandler } from '../../../common/utils/asyncHandler.js';
import { ok } from '../../../common/utils/apiResponse.js';
import { validate } from '../../../middlewares/validate.middleware.js';
import { authenticate } from '../../../middlewares/auth.middleware.js';
import { requireRole } from '../../../middlewares/rbac.middleware.js';
import { ROLES } from '../../../common/constants/roles.js';
import { prisma } from '../../../config/database.js';
import { settingsSchema } from './content.validation.js';

export const settingsRoutes = Router();

const SETTINGS_ID = 'main';

settingsRoutes.get(
  '/',
  asyncHandler(async (_req: Request, res: Response) => {
    const settings = await prisma.siteSettings.upsert({
      where: { id: SETTINGS_ID },
      update: {},
      create: { id: SETTINGS_ID },
    });
    ok(res, settings);
  }),
);

settingsRoutes.put(
  '/',
  authenticate,
  requireRole(ROLES.ADMIN, ROLES.EDITOR),
  validate({ body: settingsSchema }),
  asyncHandler(async (req: Request, res: Response) => {
    const settings = await prisma.siteSettings.upsert({
      where: { id: SETTINGS_ID },
      update: req.body,
      create: { id: SETTINGS_ID, ...req.body },
    });
    ok(res, settings);
  }),
);
