import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';
import { validateBody } from '../middlewares/validation.middleware.js';
import { asyncHandler } from '../middlewares/error-handler.middleware.js';
import { createUserSchema, updateUserSchema } from '../validators/user.validator.js';

export const userRouter = Router();

userRouter.post('/', validateBody(createUserSchema), asyncHandler(userController.create));
userRouter.get('/', asyncHandler(userController.list));
userRouter.get('/:id', asyncHandler(userController.getById));
userRouter.put('/:id', validateBody(updateUserSchema), asyncHandler(userController.update));
userRouter.delete('/:id', asyncHandler(userController.remove));

