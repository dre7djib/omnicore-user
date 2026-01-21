import { Router } from 'express';
import { userAddressesController } from '../controllers/user_addresses.controller.js';
import { validateBody } from '../middlewares/validation.middleware.js';
import { asyncHandler } from '../middlewares/error-handler.middleware.js';
import {
  createUserAddressSchema,
  updateUserAddressSchema,
} from '../validators/user_addresses.validator.js';

export const userAddressesRouter = Router();

userAddressesRouter.post(
  '/',
  validateBody(createUserAddressSchema),
  asyncHandler(userAddressesController.create),
);
userAddressesRouter.get('/', asyncHandler(userAddressesController.list));
userAddressesRouter.get('/:id', asyncHandler(userAddressesController.getById));
userAddressesRouter.put(
  '/:id',
  validateBody(updateUserAddressSchema),
  asyncHandler(userAddressesController.update),
);
userAddressesRouter.delete('/:id', asyncHandler(userAddressesController.remove));

