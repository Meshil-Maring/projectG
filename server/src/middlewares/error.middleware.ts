import type { NextFunction, Request, Response } from 'express';
import { AppError, ValidationError } from '../common/errors/AppError.js';
import { fail } from '../common/utils/apiResponse.js';
import { logger } from '../config/logger.js';
import { env } from '../config/env.js';

export function notFoundHandler(req: Request, res: Response) {
  fail(res, `Route ${req.method} ${req.originalUrl} not found`, 404);
}

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ValidationError) {
    fail(res, err.message, err.statusCode, err.details);
    return;
  }

  if (err instanceof AppError && err.isOperational) {
    fail(res, err.message, err.statusCode);
    return;
  }

  logger.error({ err, url: req.originalUrl }, 'Unhandled error');
  fail(res, env.isProd ? 'Internal server error' : String(err), 500);
}
