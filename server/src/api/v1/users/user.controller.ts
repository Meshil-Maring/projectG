import type { Request, Response } from 'express';
import { asyncHandler } from '../../../common/utils/asyncHandler.js';
import { ok } from '../../../common/utils/apiResponse.js';
import { userService } from './user.service.js';

export const userController = {
  list: asyncHandler(async (_req: Request, res: Response) => {
    ok(res, await userService.list());
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    ok(res, await userService.getById(req.params.id as string));
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    ok(res, await userService.create(req.body), 201);
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    ok(res, await userService.update(req.params.id as string, req.body));
  }),

  remove: asyncHandler(async (req: Request, res: Response) => {
    ok(res, await userService.remove(req.params.id as string));
  }),
};
