import { userRepository } from '../repositories/user.repositories.js';
import { userModel } from '../models/user.model.js';
import { logger } from '../utils/logger.js';

const normalizeCreatePayload = (payload) => {
  return {
    countryId: payload?.country_id || null,
    firstName: payload?.first_name?.trim() || null,
    lastName: payload?.last_name?.trim() || null,
    phoneNumber: payload?.phone_number?.trim() || null,
    status: payload?.status?.trim() || null,
  };
};

const normalizeUpdatePayload = (payload) => {
  const data = {};
  if (payload?.country_id !== undefined) {
    data.countryId = payload.country_id || null;
  }
  if (payload?.first_name !== undefined) {
    data.firstName = payload.first_name?.trim() || null;
  }
  if (payload?.last_name !== undefined) {
    data.lastName = payload.last_name?.trim() || null;
  }
  if (payload?.phone_number !== undefined) {
    data.phoneNumber = payload.phone_number?.trim() || null;
  }
  if (payload?.status !== undefined) {
    data.status = payload.status?.trim() || null;
  }
  return data;
};

export const userService = {
  async createUser(payload) {
    logger.info('User create requested');
    const data = normalizeCreatePayload(payload);
    const user = await userRepository.create(data);
    logger.info('User created', { user: { id: user.id } });
    return userModel.toPublic(user);
  },

  async listUsers() {
    logger.info('User list requested');
    const users = await userRepository.findMany();
    logger.info('User list completed', { user: { count: users.length } });
    return users.map(userModel.toPublic);
  },

  async getUserById(id) {
    logger.info('User get requested', { user: { id } });
    const user = await userRepository.findById(id);
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }
    logger.info('User found', { user: { id } });
    return userModel.toPublic(user);
  },

  async updateUser(id, payload) {
    logger.info('User update requested', { user: { id } });
    const data = normalizeUpdatePayload(payload);
    if (Object.keys(data).length === 0) {
      const error = new Error('No fields to update');
      error.status = 400;
      throw error;
    }
    const user = await userRepository.updateById(id, data);
    logger.info('User updated', { user: { id } });
    return userModel.toPublic(user);
  },

  async deleteUser(id) {
    logger.info('User delete requested', { user: { id } });
    const user = await userRepository.deleteById(id);
    logger.info('User deleted', { user: { id } });
    return userModel.toPublic(user);
  },
};

