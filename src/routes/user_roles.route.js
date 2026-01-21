import { Router } from 'express';
import { userRolesController } from '../controllers/user_roles.controller.js';
import { validateBody } from '../middlewares/validation.middleware.js';
import {
  createUserRoleSchema,
  updateUserRoleSchema,
} from '../validators/user_roles.validator.js';

export const userRolesRouter = Router();

userRolesRouter.post(
  '/',
  validateBody(createUserRoleSchema),
  userRolesController.create,
);
userRolesRouter.get('/', userRolesController.list);
userRolesRouter.get('/:userId', userRolesController.getByIds);
userRolesRouter.put(
  '/:userId',
  validateBody(updateUserRoleSchema),
  userRolesController.update,
);
userRolesRouter.delete('/:userId', userRolesController.remove);

