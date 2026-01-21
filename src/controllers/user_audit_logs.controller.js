import { userAuditLogsService } from '../services/user_audit_logs.service.js';
import { logger } from '../utils/logger.js';

const parseId = (value) => {
  if (!value) {
    const error = new Error('Invalid audit log id');
    error.status = 400;
    throw error;
  }
  return value;
};

const handleError = (error, req, res) => {
  const status = error.status || 500;
  logger.error('Request failed', {
    error: {
      message: error.message,
      stack: error.stack,
    },
    trace: {
      id: req.requestId,
    },
    http: {
      response: {
        status_code: status,
      },
    },
  });
  res.status(status).json({ message: error.message || 'Unexpected error' });
};

export const userAuditLogsController = {
  async create(req, res) {
    try {
      const userAuditLog = await userAuditLogsService.createUserAuditLog(
        req.body,
      );
      res.status(201).json(userAuditLog);
    } catch (error) {
      handleError(error, req, res);
    }
  },

  async list(req, res) {
    try {
      const userAuditLogs = await userAuditLogsService.listUserAuditLogs();
      res.json(userAuditLogs);
    } catch (error) {
      handleError(error, req, res);
    }
  },

  async getById(req, res) {
    try {
      const id = parseId(req.params.id);
      const userAuditLog = await userAuditLogsService.getUserAuditLogById(id);
      res.json(userAuditLog);
    } catch (error) {
      handleError(error, req, res);
    }
  },

  async update(req, res) {
    try {
      const id = parseId(req.params.id);
      const userAuditLog = await userAuditLogsService.updateUserAuditLog(
        id,
        req.body,
      );
      res.json(userAuditLog);
    } catch (error) {
      handleError(error, req, res);
    }
  },

  async remove(req, res) {
    try {
      const id = parseId(req.params.id);
      const userAuditLog = await userAuditLogsService.deleteUserAuditLog(id);
      res.json(userAuditLog);
    } catch (error) {
      handleError(error, req, res);
    }
  },
};

