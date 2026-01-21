import { userPreferencesService } from '../services/user_preferences.service.js';

const parseId = (value) => {
  if (!value) {
    const error = new Error('Invalid preference id');
    error.status = 400;
    throw error;
  }
  return value;
};

export const userPreferencesController = {
  async create(req, res) {
    const userPreference = await userPreferencesService.createUserPreference(
      req.body,
    );
    res.status(201).json(userPreference);
  },

  async list(req, res) {
    const userPreferences = await userPreferencesService.listUserPreferences();
    res.json(userPreferences);
  },

  async getById(req, res) {
    const id = parseId(req.params.id);
    const userPreference = await userPreferencesService.getUserPreferenceById(
      id,
    );
    res.json(userPreference);
  },

  async update(req, res) {
    const id = parseId(req.params.id);
    const userPreference = await userPreferencesService.updateUserPreference(
      id,
      req.body,
    );
    res.json(userPreference);
  },

  async remove(req, res) {
    const id = parseId(req.params.id);
    const userPreference = await userPreferencesService.deleteUserPreference(
      id,
    );
    res.json(userPreference);
  },
};

