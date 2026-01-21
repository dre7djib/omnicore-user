import { rolesService } from '../services/roles.service.js';

const parseId = (value) => {
  if (!value) {
    const error = new Error('Invalid role id');
    error.status = 400;
    throw error;
  }
  return value;
};

export const rolesController = {
  async create(req, res) {
    const role = await rolesService.createRole(req.body);
    res.status(201).json(role);
  },

  async list(req, res) {
    const roles = await rolesService.listRoles();
    res.json(roles);
  },

  async getById(req, res) {
    const id = parseId(req.params.id);
    const role = await rolesService.getRoleById(id);
    res.json(role);
  },

  async update(req, res) {
    const id = parseId(req.params.id);
    const role = await rolesService.updateRole(id, req.body);
    res.json(role);
  },

  async remove(req, res) {
    const id = parseId(req.params.id);
    const role = await rolesService.deleteRole(id);
    res.json(role);
  },
};

