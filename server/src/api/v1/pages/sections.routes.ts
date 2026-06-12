import { Router, type Request } from 'express';
import { prisma } from '../../../config/database.js';
import { createListResource } from '../content/listResource.js';
import { createSectionSchema, updateSectionSchema } from './pages.validation.js';

export const sectionsRoutes = Router();

sectionsRoutes.use(
  '/',
  createListResource({
    delegate: prisma.section,
    createSchema: createSectionSchema,
    updateSchema: updateSectionSchema,
    buildWhere: (req: Request) => (req.query.pageId ? { pageId: req.query.pageId as string } : undefined),
  }),
);
