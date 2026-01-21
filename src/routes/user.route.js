import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';
import { validateBody } from '../middlewares/validation.middleware.js';
import { createUserSchema, updateUserSchema } from '../validators/user.validator.js';

export const userRouter = Router();

userRouter.post('/', validateBody(createUserSchema), userController.create);
userRouter.get('/', userController.list);
userRouter.get('/:id', userController.getById);
userRouter.put('/:id', validateBody(updateUserSchema), userController.update);
userRouter.delete('/:id', userController.remove);

