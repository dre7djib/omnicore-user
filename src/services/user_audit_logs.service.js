import { userAuditLogsRepository } from '../repositories/user_audit_logs.repositories.js';
import { userAuditLogsModel } from '../models/user_audit_logs.model.js';
import { logger } from '../utils/logger.js';

const normalizeCreatePayload = (payload) => {
  if (!payload?.user_id || !payload?.action) {
    const error = new Error('user_id and action are required');
    error.status = 400;
    throw error;
  }
  return {
    userId: payload.user_id,
    action: payload.action.trim(),
    performedBy: payload?.performed_by || null,
    createdAt: payload?.created_at ? new Date(payload.created_at) : undefined,
  };
};

const normalizeUpdatePayload = (payload) => {
  const data = {};
  if (payload?.user_id !== undefined) {
    data.userId = payload.user_id;
  }
  if (payload?.action !== undefined) {
    const action = payload.action?.trim();
    if (!action) {
      const error = new Error('action cannot be empty');
      error.status = 400;
      throw error;
    }
    data.action = action;
  }
  if (payload?.performed_by !== undefined) {
    data.performedBy = payload.performed_by || null;
  }
  if (payload?.created_at !== undefined) {
    data.createdAt = payload.created_at ? new Date(payload.created_at) : null;
  }
  return data;
};

export const userAuditLogsService = {
  async createUserAuditLog(payload) {
    logger.info('User audit log create requested', {
      user: { id: payload?.user_id },
    });
    const data = normalizeCreatePayload(payload);
    const userAuditLog = await userAuditLogsRepository.create(data);
    logger.info('User audit log created', { user_audit_log: { id: userAuditLog.id } });
    return userAuditLogsModel.toPublic(userAuditLog);
  },

  async listUserAuditLogs() {
    logger.info('User audit log list requested');
    const userAuditLogs = await userAuditLogsRepository.findMany();
    logger.info('User audit log list completed', {
      user_audit_log: { count: userAuditLogs.length },
    });
    return userAuditLogs.map(userAuditLogsModel.toPublic);
  },

  async getUserAuditLogById(id) {
    logger.info('User audit log get requested', { user_audit_log: { id } });
    const userAuditLog = await userAuditLogsRepository.findById(id);
    if (!userAuditLog) {
      const error = new Error('User audit log not found');
      error.status = 404;
      throw error;
    }
    logger.info('User audit log found', { user_audit_log: { id } });
    return userAuditLogsModel.toPublic(userAuditLog);
  },

  async updateUserAuditLog(id, payload) {
    logger.info('User audit log update requested', { user_audit_log: { id } });
    const data = normalizeUpdatePayload(payload);
    if (Object.keys(data).length === 0) {
      const error = new Error('No fields to update');
      error.status = 400;
      throw error;
    }
    const userAuditLog = await userAuditLogsRepository.updateById(id, data);
    logger.info('User audit log updated', { user_audit_log: { id } });
    return userAuditLogsModel.toPublic(userAuditLog);
  },

  async deleteUserAuditLog(id) {
    logger.info('User audit log delete requested', { user_audit_log: { id } });
    const userAuditLog = await userAuditLogsRepository.deleteById(id);
    logger.info('User audit log deleted', { user_audit_log: { id } });
    return userAuditLogsModel.toPublic(userAuditLog);
  },
};

