import { Router } from 'express';
import { authRoutes } from './auth/auth.routes.js';
import { userRoutes } from './users/user.routes.js';

export const v1Routes = Router();

v1Routes.use('/auth', authRoutes);
v1Routes.use('/users', userRoutes);
