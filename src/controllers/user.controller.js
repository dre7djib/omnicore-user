import { userService } from '../services/user.service.js';
import { logger } from '../utils/logger.js';

const parseUserId = (value) => {
  if (!value) {
    const error = new Error('Invalid user id');
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

export const userController = {
  async create(req, res) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      handleError(error, req, res);
    }
  },

  async list(req, res) {
    try {
      const users = await userService.listUsers();
      res.json(users);
    } catch (error) {
      handleError(error, req, res);
    }
  },

  async getById(req, res) {
    try {
      const id = parseUserId(req.params.id);
      const user = await userService.getUserById(id);
      res.json(user);
    } catch (error) {
      handleError(error, req, res);
    }
  },

  async update(req, res) {
    try {
      const id = parseUserId(req.params.id);
      const user = await userService.updateUser(id, req.body);
      res.json(user);
    } catch (error) {
      handleError(error, req, res);
    }
  },

  async remove(req, res) {
    try {
      const id = parseUserId(req.params.id);
      const user = await userService.deleteUser(id);
      res.json(user);
    } catch (error) {
      handleError(error, req, res);
    }
  },
};