import { Router } from 'express';
import { authRoutes } from './auth/auth.routes.js';
import { userRoutes } from './users/user.routes.js';
import { contentRoutes } from './content/content.routes.js';
import { pagesRoutes } from './pages/pages.routes.js';
import { sectionsRoutes } from './pages/sections.routes.js';

export const v1Routes = Router();

v1Routes.use('/auth', authRoutes);
v1Routes.use('/users', userRoutes);
v1Routes.use('/content', contentRoutes);
v1Routes.use('/pages', pagesRoutes);
v1Routes.use('/sections', sectionsRoutes);
