import { Router } from 'express';
import { userRolesController } from '../controllers/user_roles.controller.js';
import { validateBody } from '../middlewares/validation.middleware.js';
import { asyncHandler } from '../middlewares/error-handler.middleware.js';
import {
  createUserRoleSchema,
  updateUserRoleSchema,
} from '../validators/user_roles.validator.js';

export const userRolesRouter = Router();

userRolesRouter.post(
  '/',
  validateBody(createUserRoleSchema),
  asyncHandler(userRolesController.create),
);
userRolesRouter.get('/', asyncHandler(userRolesController.list));
userRolesRouter.get('/:userId', asyncHandler(userRolesController.getByIds));
userRolesRouter.put(
  '/:userId',
  validateBody(updateUserRoleSchema),
  asyncHandler(userRolesController.update),
);
userRolesRouter.delete('/:userId', asyncHandler(userRolesController.remove));

