import { Router } from 'express';
import { rolesController } from '../controllers/roles.controller.js';
import { asyncHandler } from '../middlewares/error-handler.middleware.js';

export const rolesRouter = Router();

rolesRouter.post('/', asyncHandler(rolesController.create));
rolesRouter.get('/', asyncHandler(rolesController.list));
rolesRouter.get('/:id', asyncHandler(rolesController.getById));
rolesRouter.put('/:id', asyncHandler(rolesController.update));
rolesRouter.delete('/:id', asyncHandler(rolesController.remove));

