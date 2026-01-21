import { userRolesService } from '../services/user_roles.service.js';
import { logger } from '../utils/logger.js';

const parseUserId = (req) => {
  const { userId } = req.params;
  if (!userId) {
    const error = new Error('Invalid user_id');
    error.status = 400;
    throw error;
  }
  return userId;
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

export const userRolesController = {
  async create(req, res) {
    try {
      const userRole = await userRolesService.createUserRole(req.body);
      res.status(201).json(userRole);
    } catch (error) {
      handleError(error, req, res);
    }
  },

  async list(req, res) {
    try {
      const userRoles = await userRolesService.listUserRoles();
      res.json(userRoles);
    } catch (error) {
      handleError(error, req, res);
    }
  },

  async getByIds(req, res) {
    try {
      const userId = parseUserId(req);
      const userRole = await userRolesService.getUserRoleByUserId(userId);
      res.json(userRole);
    } catch (error) {
      handleError(error, req, res);
    }
  },

  async update(req, res) {
    try {
      const userId = parseUserId(req);
      const userRole = await userRolesService.updateUserRole(userId, req.body);
      res.json(userRole);
    } catch (error) {
      handleError(error, req, res);
    }
  },

  async remove(req, res) {
    try {
      const userId = parseUserId(req);
      const userRole = await userRolesService.deleteUserRole(userId);
      res.json(userRole);
    } catch (error) {
      handleError(error, req, res);
    }
  },
};

