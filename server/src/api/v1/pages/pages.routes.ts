import { Router, type Request, type Response } from 'express';
import { prisma } from '../../../config/database.js';
import { asyncHandler } from '../../../common/utils/asyncHandler.js';
import { ok } from '../../../common/utils/apiResponse.js';
import { NotFoundError } from '../../../common/errors/AppError.js';

export const pagesRoutes = Router();

pagesRoutes.get(
  '/',
  asyncHandler(async (_req: Request, res: Response) => {
    const pages = await prisma.page.findMany({ orderBy: { slug: 'asc' } });
    ok(res, pages);
  }),
);

pagesRoutes.get(
  '/:slug',
  asyncHandler(async (req: Request, res: Response) => {
    const slug = String(req.params.slug);
    const page = await prisma.page.findUnique({
      where: { slug },
      include: { sections: { orderBy: { order: 'asc' } } },
    });
    if (!page) throw new NotFoundError('Page not found');
    ok(res, page);
  }),
);
