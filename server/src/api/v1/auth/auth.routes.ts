import { Router } from 'express';
import { authController } from './auth.controller.js';
import { loginSchema } from './auth.validation.js';
import { validate } from '../../../middlewares/validate.middleware.js';
import { authenticate } from '../../../middlewares/auth.middleware.js';
import { authLimiter } from '../../../middlewares/rateLimiter.middleware.js';

export const authRoutes = Router();

authRoutes.post('/login', authLimiter, validate({ body: loginSchema }), authController.login);
authRoutes.get('/me', authenticate, authController.me);
