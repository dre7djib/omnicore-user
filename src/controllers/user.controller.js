import { userService } from '../services/user.service.js';

const parseUserId = (value) => {
  if (!value) {
    const error = new Error('Invalid user id');
    error.status = 400;
    throw error;
  }
  return value;
};

export const userController = {
  async create(req, res) {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  },

  async list(req, res) {
    const users = await userService.listUsers();
    res.json(users);
  },

  async getById(req, res) {
    const id = parseUserId(req.params.id);
    const user = await userService.getUserById(id);
    res.json(user);
  },

  async update(req, res) {
    const id = parseUserId(req.params.id);
    const user = await userService.updateUser(id, req.body);
    res.json(user);
  },

  async remove(req, res) {
    const id = parseUserId(req.params.id);
    const user = await userService.deleteUser(id);
    res.json(user);
  },
};