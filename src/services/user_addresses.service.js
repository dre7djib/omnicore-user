import { userAddressesRepository } from '../repositories/user_addresses.repositories.js';
import { userAddressesModel } from '../models/user_addresses.model.js';
import { logger } from '../utils/logger.js';

const normalizeCreatePayload = (payload) => {
  if (!payload?.user_id) {
    const error = new Error('user_id is required');
    error.status = 400;
    throw error;
  }
  return {
    userId: payload.user_id,
    countryId: payload?.country_id || null,
    street: payload?.street?.trim() || null,
    city: payload?.city?.trim() || null,
    postalCode: payload?.postal_code?.trim() || null,
    isPrimary: payload?.is_primary ?? false,
  };
};

const normalizeUpdatePayload = (payload) => {
  const data = {};
  if (payload?.user_id !== undefined) {
    data.userId = payload.user_id;
  }
  if (payload?.country_id !== undefined) {
    data.countryId = payload.country_id || null;
  }
  if (payload?.street !== undefined) {
    data.street = payload.street?.trim() || null;
  }
  if (payload?.city !== undefined) {
    data.city = payload.city?.trim() || null;
  }
  if (payload?.postal_code !== undefined) {
    data.postalCode = payload.postal_code?.trim() || null;
  }
  if (payload?.is_primary !== undefined) {
    data.isPrimary = payload.is_primary;
  }
  return data;
};

export const userAddressesService = {
  async createUserAddress(payload) {
    logger.info('User address create requested', {
      user: { id: payload?.user_id },
    });
    const data = normalizeCreatePayload(payload);
    const userAddress = await userAddressesRepository.create(data);
    logger.info('User address created', { user_address: { id: userAddress.id } });
    return userAddressesModel.toPublic(userAddress);
  },

  async listUserAddresses() {
    logger.info('User address list requested');
    const userAddresses = await userAddressesRepository.findMany();
    logger.info('User address list completed', {
      user_address: { count: userAddresses.length },
    });
    return userAddresses.map(userAddressesModel.toPublic);
  },

  async getUserAddressById(id) {
    logger.info('User address get requested', { user_address: { id } });
    const userAddress = await userAddressesRepository.findById(id);
    if (!userAddress) {
      const error = new Error('User address not found');
      error.status = 404;
      throw error;
    }
    logger.info('User address found', { user_address: { id } });
    return userAddressesModel.toPublic(userAddress);
  },

  async updateUserAddress(id, payload) {
    logger.info('User address update requested', { user_address: { id } });
    const data = normalizeUpdatePayload(payload);
    if (Object.keys(data).length === 0) {
      const error = new Error('No fields to update');
      error.status = 400;
      throw error;
    }
    const userAddress = await userAddressesRepository.updateById(id, data);
    logger.info('User address updated', { user_address: { id } });
    return userAddressesModel.toPublic(userAddress);
  },

  async deleteUserAddress(id) {
    logger.info('User address delete requested', { user_address: { id } });
    const userAddress = await userAddressesRepository.deleteById(id);
    logger.info('User address deleted', { user_address: { id } });
    return userAddressesModel.toPublic(userAddress);
  },
};

