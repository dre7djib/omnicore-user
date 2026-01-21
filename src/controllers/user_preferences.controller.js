import { userPreferencesService } from '../services/user_preferences.service.js';
import { logger } from '../utils/logger.js';

const parseId = (value) => {
  if (!value) {
    const error = new Error('Invalid preference id');
    error.status = 400;
    throw error;
  }
  return value;
};

const handleError = (error, req, res) => {
  const status = error.status || 500;
  logger.error('Request failed', {
    error: {
      message: error.message,
      stack: error.stack,
    },
    trace: {
      id: req.requestId,
    },
    http: {
      response: {
        status_code: status,
      },
    },
  });
  res.status(status).json({ message: error.message || 'Unexpected error' });
};

export const userPreferencesController = {
  async create(req, res) {
    try {
      const userPreference = await userPreferencesService.createUserPreference(
        req.body,
      );
      res.status(201).json(userPreference);
    } catch (error) {
      handleError(error, req, res);
    }
  },

  async list(req, res) {
    try {
      const userPreferences = await userPreferencesService.listUserPreferences();
      res.json(userPreferences);
    } catch (error) {
      handleError(error, req, res);
    }
  },

  async getById(req, res) {
    try {
      const id = parseId(req.params.id);
      const userPreference = await userPreferencesService.getUserPreferenceById(
        id,
      );
      res.json(userPreference);
    } catch (error) {
      handleError(error, req, res);
    }
  },

  async update(req, res) {
    try {
      const id = parseId(req.params.id);
      const userPreference = await userPreferencesService.updateUserPreference(
        id,
        req.body,
      );
      res.json(userPreference);
    } catch (error) {
      handleError(error, req, res);
    }
  },

  async remove(req, res) {
    try {
      const id = parseId(req.params.id);
      const userPreference = await userPreferencesService.deleteUserPreference(
        id,
      );
      res.json(userPreference);
    } catch (error) {
      handleError(error, req, res);
    }
  },
};

