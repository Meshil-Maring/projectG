import { Router, type Request, type Response } from 'express';
import { z, type ZodType } from 'zod';
import { asyncHandler } from '../../../common/utils/asyncHandler.js';
import { ok } from '../../../common/utils/apiResponse.js';
import { validate } from '../../../middlewares/validate.middleware.js';
import { authenticate } from '../../../middlewares/auth.middleware.js';
import { requireRole } from '../../../middlewares/rbac.middleware.js';
import { ROLES } from '../../../common/constants/roles.js';
import { NotFoundError } from '../../../common/errors/AppError.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Delegate {
  findMany: (args?: any) => Promise<any[]>;
  count: (args?: any) => Promise<number>;
  create: (args: any) => Promise<any>;
  update: (args: any) => Promise<any>;
  delete: (args: any) => Promise<any>;
}

const reorderSchema = z.object({ ids: z.array(z.number().int()) });

export function createListResource(opts: {
  delegate: Delegate;
  createSchema: ZodType;
  updateSchema: ZodType;
  buildWhere?: (req: Request) => Record<string, unknown> | undefined;
}) {
  const router = Router();
  const { delegate, createSchema, updateSchema, buildWhere } = opts;

  router.get(
    '/',
    asyncHandler(async (req: Request, res: Response) => {
      const items = await delegate.findMany({
        where: buildWhere?.(req),
        orderBy: { order: 'asc' },
      });
      ok(res, items);
    }),
  );

  router.use(authenticate, requireRole(ROLES.ADMIN, ROLES.EDITOR));

  router.post(
    '/',
    validate({ body: createSchema }),
    asyncHandler(async (req: Request, res: Response) => {
      const where = buildWhere?.(req);
      const count = await delegate.count({ where });
      const data = { ...req.body, ...where, order: req.body.order ?? count };
      const item = await delegate.create({ data });
      ok(res, item, 201);
    }),
  );

  router.patch(
    '/reorder',
    validate({ body: reorderSchema }),
    asyncHandler(async (req: Request, res: Response) => {
      const { ids } = req.body as { ids: number[] };
      for (const [index, id] of ids.entries()) {
        await delegate.update({ where: { id }, data: { order: index } });
      }
      ok(res, { success: true });
    }),
  );

  router.patch(
    '/:id',
    validate({ body: updateSchema }),
    asyncHandler(async (req: Request, res: Response) => {
      const id = Number(req.params.id);
      try {
        const item = await delegate.update({ where: { id }, data: req.body });
        ok(res, item);
      } catch {
        throw new NotFoundError('Item not found');
      }
    }),
  );

  router.delete(
    '/:id',
    asyncHandler(async (req: Request, res: Response) => {
      const id = Number(req.params.id);
      try {
        const item = await delegate.delete({ where: { id } });
        ok(res, item);
      } catch {
        throw new NotFoundError('Item not found');
      }
    }),
  );

  return router;
}
