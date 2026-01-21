import { Router } from 'express';
import { userPreferencesController } from '../controllers/user_preferences.controller.js';
import { validateBody } from '../middlewares/validation.middleware.js';
import {
  createUserPreferenceSchema,
  updateUserPreferenceSchema,
} from '../validators/user_preferences.validator.js';

export const userPreferencesRouter = Router();

userPreferencesRouter.post(
  '/',
  validateBody(createUserPreferenceSchema),
  userPreferencesController.create,
);
userPreferencesRouter.get('/', userPreferencesController.list);
userPreferencesRouter.get('/:id', userPreferencesController.getById);
userPreferencesRouter.put(
  '/:id',
  validateBody(updateUserPreferenceSchema),
  userPreferencesController.update,
);
userPreferencesRouter.delete('/:id', userPreferencesController.remove);

