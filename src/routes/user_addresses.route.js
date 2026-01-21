import { Router } from 'express';
import { userAddressesController } from '../controllers/user_addresses.controller.js';
import { validateBody } from '../middlewares/validation.middleware.js';
import {
  createUserAddressSchema,
  updateUserAddressSchema,
} from '../validators/user_addresses.validator.js';

export const userAddressesRouter = Router();

userAddressesRouter.post(
  '/',
  validateBody(createUserAddressSchema),
  userAddressesController.create,
);
userAddressesRouter.get('/', userAddressesController.list);
userAddressesRouter.get('/:id', userAddressesController.getById);
userAddressesRouter.put(
  '/:id',
  validateBody(updateUserAddressSchema),
  userAddressesController.update,
);
userAddressesRouter.delete('/:id', userAddressesController.remove);

