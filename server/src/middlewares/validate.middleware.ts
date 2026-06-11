import type { NextFunction, Request, Response } from 'express';
import type { ZodType } from 'zod';
import { ValidationError } from '../common/errors/AppError.js';

interface Schemas {
  body?: ZodType;
  query?: ZodType;
  params?: ZodType;
}

export function validate(schemas: Schemas) {
  return (req: Request, _res: Response, next: NextFunction) => {
    for (const key of ['body', 'query', 'params'] as const) {
      const schema = schemas[key];
      if (!schema) continue;
      const result = schema.safeParse(req[key]);
      if (!result.success) {
        next(new ValidationError(`Invalid request ${key}`, result.error.flatten().fieldErrors));
        return;
      }
      if (key === 'body') req.body = result.data;
    }
    next();
  };
}
