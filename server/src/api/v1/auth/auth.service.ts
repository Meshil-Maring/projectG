import bcrypt from 'bcryptjs';
import jwt, { type SignOptions } from 'jsonwebtoken';
import crypto from 'crypto';
import { ConflictError, NotFoundError, UnauthorizedError } from '../../../common/errors/AppError.js';
import { env } from '../../../config/env.js';
import { userRepository } from '../users/user.repository.js';
import type { LoginInput, UpdateMeInput, ForgotPasswordInput, ResetPasswordInput } from './auth.validation.js';
import type { JwtPayload } from '../../../middlewares/auth.middleware.js';
import { sendPasswordResetEmail } from '../../../common/services/email.service.js';
import { passwordResetTemplate } from '../../../common/services/email.templates.js';
import { prisma } from '../../../config/database.js';

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

  async forgotPassword({ email }: ForgotPasswordInput) {
    const user = await userRepository.findByEmail(email);
    // Always return success to avoid user enumeration
    if (!user) return { message: 'If that email exists, a reset link has been sent.' };

    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: { passwordResetToken: token, passwordResetExpiry: expiry },
    });

    const resetUrl = `${env.CORS_ORIGIN.split(',')[0].trim()}/projectG-admin/reset-password?token=${token}`;
    const html = passwordResetTemplate({ name: user.name, resetUrl });
    await sendPasswordResetEmail(user.email, html);

    return { message: 'If that email exists, a reset link has been sent.' };
  },

  async resetPassword({ token, password }: ResetPasswordInput) {
    const user = await userRepository.findByResetToken(token);

    if (!user || !user.passwordResetExpiry || user.passwordResetExpiry < new Date()) {
      throw new NotFoundError('Invalid or expired reset token');
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: await bcrypt.hash(password, 12),
        passwordResetToken: null,
        passwordResetExpiry: null,
      },
    });

    return { message: 'Password has been reset successfully.' };
  },
};
