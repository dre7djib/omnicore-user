import { Router } from 'express';
import { userAuditLogsController } from '../controllers/user_audit_logs.controller.js';
import { validateBody } from '../middlewares/validation.middleware.js';
import { asyncHandler } from '../middlewares/error-handler.middleware.js';
import {
  createUserAuditLogSchema,
  updateUserAuditLogSchema,
} from '../validators/user_audit_logs.validator.js';

export const userAuditLogsRouter = Router();

userAuditLogsRouter.post(
  '/',
  validateBody(createUserAuditLogSchema),
  asyncHandler(userAuditLogsController.create),
);
userAuditLogsRouter.get('/', asyncHandler(userAuditLogsController.list));
userAuditLogsRouter.get('/:id', asyncHandler(userAuditLogsController.getById));
userAuditLogsRouter.put(
  '/:id',
  validateBody(updateUserAuditLogSchema),
  asyncHandler(userAuditLogsController.update),
);
userAuditLogsRouter.delete('/:id', asyncHandler(userAuditLogsController.remove));

