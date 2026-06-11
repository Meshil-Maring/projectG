import { z } from 'zod';
import { ROLES } from '../../../common/constants/roles.js';

export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum([ROLES.ADMIN, ROLES.EDITOR]).default(ROLES.EDITOR),
});

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(1).max(100).optional(),
  password: z.string().min(8).optional(),
  role: z.enum([ROLES.ADMIN, ROLES.EDITOR]).optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
