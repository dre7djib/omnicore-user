import { userAuditLogsService } from '../services/user_audit_logs.service.js';

const parseId = (value) => {
  if (!value) {
    const error = new Error('Invalid audit log id');
    error.status = 400;
    throw error;
  }
  return value;
};

export const userAuditLogsController = {
  async create(req, res) {
    const userAuditLog = await userAuditLogsService.createUserAuditLog(
      req.body,
    );
    res.status(201).json(userAuditLog);
  },

  async list(req, res) {
    const userAuditLogs = await userAuditLogsService.listUserAuditLogs();
    res.json(userAuditLogs);
  },

  async getById(req, res) {
    const id = parseId(req.params.id);
    const userAuditLog = await userAuditLogsService.getUserAuditLogById(id);
    res.json(userAuditLog);
  },

  async update(req, res) {
    const id = parseId(req.params.id);
    const userAuditLog = await userAuditLogsService.updateUserAuditLog(
      id,
      req.body,
    );
    res.json(userAuditLog);
  },

  async remove(req, res) {
    const id = parseId(req.params.id);
    const userAuditLog = await userAuditLogsService.deleteUserAuditLog(id);
    res.json(userAuditLog);
  },
};

