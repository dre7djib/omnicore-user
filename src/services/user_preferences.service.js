import { userPreferencesRepository } from '../repositories/user_preferences.repositories.js';
import { userPreferencesModel } from '../models/user_preferences.model.js';
import { logger } from '../utils/logger.js';

const normalizeCreatePayload = (payload) => {
  if (!payload?.user_id) {
    const error = new Error('user_id is required');
    error.status = 400;
    throw error;
  }
  return {
    userId: payload.user_id,
    language: payload?.language?.trim() || null,
    timezone: payload?.timezone?.trim() || null,
    notificationsEnabled: payload?.notifications_enabled ?? true,
  };
};

const normalizeUpdatePayload = (payload) => {
  const data = {};
  if (payload?.user_id !== undefined) {
    data.userId = payload.user_id;
  }
  if (payload?.language !== undefined) {
    data.language = payload.language?.trim() || null;
  }
  if (payload?.timezone !== undefined) {
    data.timezone = payload.timezone?.trim() || null;
  }
  if (payload?.notifications_enabled !== undefined) {
    data.notificationsEnabled = payload.notifications_enabled;
  }
  return data;
};

export const userPreferencesService = {
  async createUserPreference(payload) {
    logger.info('User preference create requested', {
      user: { id: payload?.user_id },
    });
    const data = normalizeCreatePayload(payload);
    const userPreference = await userPreferencesRepository.create(data);
    logger.info('User preference created', {
      user_preference: { id: userPreference.id },
    });
    return userPreferencesModel.toPublic(userPreference);
  },

  async listUserPreferences() {
    logger.info('User preference list requested');
    const userPreferences = await userPreferencesRepository.findMany();
    logger.info('User preference list completed', {
      user_preference: { count: userPreferences.length },
    });
    return userPreferences.map(userPreferencesModel.toPublic);
  },

  async getUserPreferenceById(id) {
    logger.info('User preference get requested', { user_preference: { id } });
    const userPreference = await userPreferencesRepository.findById(id);
    if (!userPreference) {
      const error = new Error('User preference not found');
      error.status = 404;
      throw error;
    }
    logger.info('User preference found', { user_preference: { id } });
    return userPreferencesModel.toPublic(userPreference);
  },

  async updateUserPreference(id, payload) {
    logger.info('User preference update requested', { user_preference: { id } });
    const data = normalizeUpdatePayload(payload);
    if (Object.keys(data).length === 0) {
      const error = new Error('No fields to update');
      error.status = 400;
      throw error;
    }
    const userPreference = await userPreferencesRepository.updateById(id, data);
    logger.info('User preference updated', { user_preference: { id } });
    return userPreferencesModel.toPublic(userPreference);
  },

  async deleteUserPreference(id) {
    logger.info('User preference delete requested', { user_preference: { id } });
    const userPreference = await userPreferencesRepository.deleteById(id);
    logger.info('User preference deleted', { user_preference: { id } });
    return userPreferencesModel.toPublic(userPreference);
  },
};

