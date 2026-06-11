import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../common/errors/AppError.js';
import type { Role } from '../common/constants/roles.js';
import { env } from '../config/env.js';

export interface JwtPayload {
  sub: string;
  email: string;
  role: Role;
}

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    next(new UnauthorizedError('Missing or malformed Authorization header'));
    return;
  }

  try {
    const payload = jwt.verify(header.slice(7), env.JWT_SECRET) as JwtPayload;
    req.user = { id: payload.sub, email: payload.email, role: payload.role };
    next();
  } catch {
    next(new UnauthorizedError('Invalid or expired token'));
  }
}
