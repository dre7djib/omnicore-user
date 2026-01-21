import { rolesService } from '../services/roles.service.js';
import { logger } from '../utils/logger.js';

const parseId = (value) => {
  if (!value) {
    const error = new Error('Invalid role id');
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

export const rolesController = {
  async create(req, res) {
    try {
      const role = await rolesService.createRole(req.body);
      res.status(201).json(role);
    } catch (error) {
      handleError(error, req, res);
    }
  },

  async list(req, res) {
    try {
      const roles = await rolesService.listRoles();
      res.json(roles);
    } catch (error) {
      handleError(error, req, res);
    }
  },

  async getById(req, res) {
    try {
      const id = parseId(req.params.id);
      const role = await rolesService.getRoleById(id);
      res.json(role);
    } catch (error) {
      handleError(error, req, res);
    }
  },

  async update(req, res) {
    try {
      const id = parseId(req.params.id);
      const role = await rolesService.updateRole(id, req.body);
      res.json(role);
    } catch (error) {
      handleError(error, req, res);
    }
  },

  async remove(req, res) {
    try {
      const id = parseId(req.params.id);
      const role = await rolesService.deleteRole(id);
      res.json(role);
    } catch (error) {
      handleError(error, req, res);
    }
  },
};

