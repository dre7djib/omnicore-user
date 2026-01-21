import { userRolesService } from '../services/user_roles.service.js';

const parseUserId = (req) => {
  const { userId } = req.params;
  if (!userId) {
    const error = new Error('Invalid user_id');
    error.status = 400;
    throw error;
  }
  return userId;
};

export const userRolesController = {
  async create(req, res) {
    const userRole = await userRolesService.createUserRole(req.body);
    res.status(201).json(userRole);
  },

  async list(req, res) {
    const userRoles = await userRolesService.listUserRoles();
    res.json(userRoles);
  },

  async getByIds(req, res) {
    const userId = parseUserId(req);
    const userRole = await userRolesService.getUserRoleByUserId(userId);
    res.json(userRole);
  },

  async update(req, res) {
    const userId = parseUserId(req);
    const userRole = await userRolesService.updateUserRole(userId, req.body);
    res.json(userRole);
  },

  async remove(req, res) {
    const userId = parseUserId(req);
    const userRole = await userRolesService.deleteUserRole(userId);
    res.json(userRole);
  },
};

