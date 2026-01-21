import { rolesRepository } from '../repositories/roles.repositories.js';
import { rolesModel } from '../models/roles.model.js';
import { logger } from '../utils/logger.js';

const normalizeCreatePayload = (payload) => {
  const name = payload?.name?.trim();
  if (!name) {
    const error = new Error('name is required');
    error.status = 400;
    throw error;
  }
  return {
    name,
    description: payload?.description?.trim() || null,
  };
};

const normalizeUpdatePayload = (payload) => {
  const data = {};
  if (payload?.name !== undefined) {
    const name = payload.name?.trim();
    if (!name) {
      const error = new Error('name cannot be empty');
      error.status = 400;
      throw error;
    }
    data.name = name;
  }
  if (payload?.description !== undefined) {
    data.description = payload.description?.trim() || null;
  }
  return data;
};

export const rolesService = {
  async createRole(payload) {
    logger.info('Role create requested', { role: { name: payload?.name } });
    const data = normalizeCreatePayload(payload);
    const role = await rolesRepository.create(data);
    logger.info('Role created', { role: { id: role.id } });
    return rolesModel.toPublic(role);
  },

  async listRoles() {
    logger.info('Role list requested');
    const roles = await rolesRepository.findMany();
    logger.info('Role list completed', { role: { count: roles.length } });
    return roles.map(rolesModel.toPublic);
  },

  async getRoleById(id) {
    logger.info('Role get requested', { role: { id } });
    const role = await rolesRepository.findById(id);
    if (!role) {
      const error = new Error('Role not found');
      error.status = 404;
      throw error;
    }
    logger.info('Role found', { role: { id } });
    return rolesModel.toPublic(role);
  },

  async updateRole(id, payload) {
    logger.info('Role update requested', { role: { id } });
    const data = normalizeUpdatePayload(payload);
    if (Object.keys(data).length === 0) {
      const error = new Error('No fields to update');
      error.status = 400;
      throw error;
    }
    const role = await rolesRepository.updateById(id, data);
    logger.info('Role updated', { role: { id } });
    return rolesModel.toPublic(role);
  },

  async deleteRole(id) {
    logger.info('Role delete requested', { role: { id } });
    const role = await rolesRepository.deleteById(id);
    logger.info('Role deleted', { role: { id } });
    return rolesModel.toPublic(role);
  },
};

