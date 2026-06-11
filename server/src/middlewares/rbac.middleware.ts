import type { NextFunction, Request, Response } from 'express';
import { ForbiddenError, UnauthorizedError } from '../common/errors/AppError.js';
import type { Role } from '../common/constants/roles.js';

export function requireRole(...roles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      next(new UnauthorizedError());
      return;
    }
    if (!roles.includes(req.user.role)) {
      next(new ForbiddenError('Insufficient permissions'));
      return;
    }
    next();
  };
}
