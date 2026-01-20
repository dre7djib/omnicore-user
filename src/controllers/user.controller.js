import { userService } from '../services/user.service.js';

const parseUserId = (value) => {
  const id = Number.parseInt(value, 10);
  if (Number.isNaN(id)) {
    const error = new Error('Invalid user id');
    error.status = 400;
    throw error;
  }
  return id;
};

const handleError = (error, res) => {
  const status = error.status || 500;
  res.status(status).json({ message: error.message || 'Unexpected error' });
};

export const userController = {
  async create(req, res) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      handleError(error, res);
    }
  },

  async list(req, res) {
    try {
      const users = await userService.listUsers();
      res.json(users);
    } catch (error) {
      handleError(error, res);
    }
  },

  async getById(req, res) {
    try {
      const id = parseUserId(req.params.id);
      const user = await userService.getUserById(id);
      res.json(user);
    } catch (error) {
      handleError(error, res);
    }
  },

  async update(req, res) {
    try {
      const id = parseUserId(req.params.id);
      const user = await userService.updateUser(id, req.body);
      res.json(user);
    } catch (error) {
      handleError(error, res);
    }
  },

  async remove(req, res) {
    try {
      const id = parseUserId(req.params.id);
      const user = await userService.deleteUser(id);
      res.json(user);
    } catch (error) {
      handleError(error, res);
    }
  },
};