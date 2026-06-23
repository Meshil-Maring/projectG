import { prisma } from '../../../config/database.js';
import type { Prisma } from '@prisma/client';

const publicSelect = {
  id: true,
  email: true,
  name: true,
  role: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect;

export const userRepository = {
  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  findByResetToken(token: string) {
    return prisma.user.findUnique({ where: { passwordResetToken: token } });
  },

  findById(id: string) {
    return prisma.user.findUnique({ where: { id }, select: publicSelect });
  },

  findAll() {
    return prisma.user.findMany({ select: publicSelect, orderBy: { createdAt: 'desc' } });
  },

  create(data: Prisma.UserCreateInput) {
    return prisma.user.create({ data, select: publicSelect });
  },

  update(id: string, data: Prisma.UserUpdateInput) {
    return prisma.user.update({ where: { id }, data, select: publicSelect });
  },

  delete(id: string) {
    return prisma.user.delete({ where: { id }, select: publicSelect });
  },
};
