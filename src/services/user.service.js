import { userRepository } from '../repositories/user.repositories.js';
import { userModel } from '../models/user.model.js';

const normalizeCreatePayload = (payload) => {
  const email = payload?.email?.trim();
  const name = payload?.name?.trim();

  if (!email) {
    const error = new Error('Email is required');
    error.status = 400;
    throw error;
  }

  return {
    email,
    name: name || null,
  };
};

const normalizeUpdatePayload = (payload) => {
  const data = {};
  if (payload?.email !== undefined) {
    const email = payload.email?.trim();
    if (!email) {
      const error = new Error('Email cannot be empty');
      error.status = 400;
      throw error;
    }
    data.email = email;
  }
  if (payload?.name !== undefined) {
    const name = payload.name?.trim();
    data.name = name || null;
  }
  return data;
};

export const userService = {
  async createUser(payload) {
    const data = normalizeCreatePayload(payload);
    const user = await userRepository.create(data);
    return userModel.toPublic(user);
  },

  async listUsers() {
    const users = await userRepository.findMany();
    return users.map(userModel.toPublic);
  },

  async getUserById(id) {
    const user = await userRepository.findById(id);
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }
    return userModel.toPublic(user);
  },

  async updateUser(id, payload) {
    const data = normalizeUpdatePayload(payload);
    if (Object.keys(data).length === 0) {
      const error = new Error('No fields to update');
      error.status = 400;
      throw error;
    }
    const user = await userRepository.updateById(id, data);
    return userModel.toPublic(user);
  },

  async deleteUser(id) {
    const user = await userRepository.deleteById(id);
    return userModel.toPublic(user);
  },
};

