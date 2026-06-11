import bcrypt from 'bcryptjs';
import { ConflictError, NotFoundError } from '../../../common/errors/AppError.js';
import { userRepository } from './user.repository.js';
import type { CreateUserInput, UpdateUserInput } from './user.validation.js';

export const userService = {
  async list() {
    return userRepository.findAll();
  },

  async getById(id: string) {
    const user = await userRepository.findById(id);
    if (!user) throw new NotFoundError('User not found');
    return user;
  },

  async create(input: CreateUserInput) {
    const existing = await userRepository.findByEmail(input.email);
    if (existing) throw new ConflictError('A user with this email already exists');

    return userRepository.create({
      ...input,
      password: await bcrypt.hash(input.password, 12),
    });
  },

  async update(id: string, input: UpdateUserInput) {
    await this.getById(id);

    const data = { ...input };
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 12);
    }
    return userRepository.update(id, data);
  },

  async remove(id: string) {
    await this.getById(id);
    return userRepository.delete(id);
  },
};
