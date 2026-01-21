import { Router } from 'express';
import { rolesController } from '../controllers/roles.controller.js';

export const rolesRouter = Router();

rolesRouter.post('/', rolesController.create);
rolesRouter.get('/', rolesController.list);
rolesRouter.get('/:id', rolesController.getById);
rolesRouter.put('/:id', rolesController.update);
rolesRouter.delete('/:id', rolesController.remove);

