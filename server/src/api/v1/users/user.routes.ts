import { Router } from 'express';
import { userController } from './user.controller.js';
import { createUserSchema, updateUserSchema } from './user.validation.js';
import { validate } from '../../../middlewares/validate.middleware.js';
import { authenticate } from '../../../middlewares/auth.middleware.js';
import { requireRole } from '../../../middlewares/rbac.middleware.js';
import { ROLES } from '../../../common/constants/roles.js';

export const userRoutes = Router();

userRoutes.use(authenticate, requireRole(ROLES.ADMIN));

userRoutes.get('/', userController.list);
userRoutes.get('/:id', userController.getById);
userRoutes.post('/', validate({ body: createUserSchema }), userController.create);
userRoutes.patch('/:id', validate({ body: updateUserSchema }), userController.update);
userRoutes.delete('/:id', userController.remove);
