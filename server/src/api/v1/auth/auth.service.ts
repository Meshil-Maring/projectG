import bcrypt from 'bcryptjs';
import jwt, { type SignOptions } from 'jsonwebtoken';
import { UnauthorizedError } from '../../../common/errors/AppError.js';
import { env } from '../../../config/env.js';
import { userRepository } from '../users/user.repository.js';
import type { LoginInput } from './auth.validation.js';
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
};
