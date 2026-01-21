import { Router } from 'express';
import { userPreferencesController } from '../controllers/user_preferences.controller.js';
import { validateBody } from '../middlewares/validation.middleware.js';
import { asyncHandler } from '../middlewares/error-handler.middleware.js';
import {
  createUserPreferenceSchema,
  updateUserPreferenceSchema,
} from '../validators/user_preferences.validator.js';

export const userPreferencesRouter = Router();

userPreferencesRouter.post(
  '/',
  validateBody(createUserPreferenceSchema),
  asyncHandler(userPreferencesController.create),
);
userPreferencesRouter.get('/', asyncHandler(userPreferencesController.list));
userPreferencesRouter.get('/:id', asyncHandler(userPreferencesController.getById));
userPreferencesRouter.put(
  '/:id',
  validateBody(updateUserPreferenceSchema),
  asyncHandler(userPreferencesController.update),
);
userPreferencesRouter.delete('/:id', asyncHandler(userPreferencesController.remove));

