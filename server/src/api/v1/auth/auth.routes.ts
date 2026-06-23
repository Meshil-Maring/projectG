import { Router } from 'express';
import { authController } from './auth.controller.js';
import { loginSchema, updateMeSchema, forgotPasswordSchema, resetPasswordSchema } from './auth.validation.js';
import { validate } from '../../../middlewares/validate.middleware.js';
import { authenticate } from '../../../middlewares/auth.middleware.js';
import { authLimiter } from '../../../middlewares/rateLimiter.middleware.js';

export const authRoutes = Router();

authRoutes.post('/login', authLimiter, validate({ body: loginSchema }), authController.login);
authRoutes.get('/me', authenticate, authController.me);
authRoutes.patch(
  '/me',
  authenticate,
  authLimiter,
  validate({ body: updateMeSchema }),
  authController.updateMe,
);
authRoutes.post(
  '/forgot-password',
  authLimiter,
  validate({ body: forgotPasswordSchema }),
  authController.forgotPassword,
);
authRoutes.post(
  '/reset-password',
  authLimiter,
  validate({ body: resetPasswordSchema }),
  authController.resetPassword,
);
