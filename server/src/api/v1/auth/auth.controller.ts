import type { Request, Response } from 'express';
import { asyncHandler } from '../../../common/utils/asyncHandler.js';
import { ok } from '../../../common/utils/apiResponse.js';
import { authService } from './auth.service.js';

export const authController = {
  login: asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.login(req.body);
    ok(res, result);
  }),

  me: asyncHandler(async (req: Request, res: Response) => {
    ok(res, req.user);
  }),

  updateMe: asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.updateMe(req.user!.email, req.body);
    ok(res, result);
  }),
};
