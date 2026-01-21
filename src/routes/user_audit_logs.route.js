import { Router } from 'express';
import { userAuditLogsController } from '../controllers/user_audit_logs.controller.js';
import { validateBody } from '../middlewares/validation.middleware.js';
import {
  createUserAuditLogSchema,
  updateUserAuditLogSchema,
} from '../validators/user_audit_logs.validator.js';

export const userAuditLogsRouter = Router();

userAuditLogsRouter.post(
  '/',
  validateBody(createUserAuditLogSchema),
  userAuditLogsController.create,
);
userAuditLogsRouter.get('/', userAuditLogsController.list);
userAuditLogsRouter.get('/:id', userAuditLogsController.getById);
userAuditLogsRouter.put(
  '/:id',
  validateBody(updateUserAuditLogSchema),
  userAuditLogsController.update,
);
userAuditLogsRouter.delete('/:id', userAuditLogsController.remove);

