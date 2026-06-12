import bcrypt from 'bcryptjs';
import jwt, { type SignOptions } from 'jsonwebtoken';
import { ConflictError, UnauthorizedError } from '../../../common/errors/AppError.js';
import { env } from '../../../config/env.js';
import { userRepository } from '../users/user.repository.js';
import type { LoginInput, UpdateMeInput } from './auth.validation.js';
import type { JwtPayload } from '../../../middlewares/auth.middleware.js';

export const authService = {
  async login({ email, password }: LoginInput) {
    const user = await userRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const payload: JwtPayload = { sub: user.id, email: user.email, role: user.role };
    const token = jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
    });

    return {
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    };
  },

  async updateMe(currentEmail: string, input: UpdateMeInput) {
    const user = await userRepository.findByEmail(currentEmail);
    if (!user || !(await bcrypt.compare(input.currentPassword, user.password))) {
      throw new UnauthorizedError('Current password is incorrect');
    }

    if (input.email && input.email !== user.email) {
      const existing = await userRepository.findByEmail(input.email);
      if (existing) throw new ConflictError('A user with this email already exists');
    }

    const updated = await userRepository.update(user.id, {
      ...(input.email ? { email: input.email } : {}),
      ...(input.password ? { password: await bcrypt.hash(input.password, 12) } : {}),
    });

    const payload: JwtPayload = { sub: updated.id, email: updated.email, role: updated.role };
    const token = jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
    });

    return { token, user: updated };
  },
};
