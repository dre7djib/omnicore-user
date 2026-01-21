import { userRolesRepository } from '../repositories/user_roles.repositories.js';
import { userRolesModel } from '../models/user_roles.model.js';
import { logger } from '../utils/logger.js';

const normalizeCreatePayload = (payload) => {
  if (!payload?.user_id || !payload?.role_id) {
    const error = new Error('user_id and role_id are required');
    error.status = 400;
    throw error;
  }
  return {
    userId: payload.user_id,
    roleId: payload.role_id,
    assignedAt: payload.assigned_at ? new Date(payload.assigned_at) : undefined,
  };
};

const normalizeUpdatePayload = (payload) => {
  const data = {};
  if (payload?.role_id !== undefined) {
    data.roleId = payload.role_id;
  }
  if (payload?.assigned_at !== undefined) {
    data.assignedAt = payload.assigned_at ? new Date(payload.assigned_at) : null;
  }
  return data;
};

export const userRolesService = {
  async createUserRole(payload) {
    logger.info('User role create requested', {
      user: { id: payload?.user_id },
      role: { id: payload?.role_id },
    });
    const data = normalizeCreatePayload(payload);
    const existing = await userRolesRepository.findByUserId(data.userId);
    if (existing) {
      const error = new Error('User role already exists');
      error.status = 409;
      throw error;
    }
    const userRole = await userRolesRepository.create(data);
    logger.info('User role created', {
      user: { id: userRole.userId },
      role: { id: userRole.roleId },
    });
    return userRolesModel.toPublic(userRole);
  },

  async listUserRoles() {
    logger.info('User role list requested');
    const userRoles = await userRolesRepository.findMany();
    logger.info('User role list completed', { user_role: { count: userRoles.length } });
    return userRoles.map(userRolesModel.toPublic);
  },

  async getUserRoleByUserId(userId) {
    logger.info('User role get requested', {
      user: { id: userId },
    });
    const userRole = await userRolesRepository.findByUserId(userId);
    if (!userRole) {
      const error = new Error('User role not found');
      error.status = 404;
      throw error;
    }
    logger.info('User role found', {
      user: { id: userId },
    });
    return userRolesModel.toPublic(userRole);
  },

  async updateUserRole(userId, payload) {
    logger.info('User role update requested', {
      user: { id: userId },
    });
    const data = normalizeUpdatePayload(payload);
    if (Object.keys(data).length === 0) {
      const error = new Error('No fields to update');
      error.status = 400;
      throw error;
    }
    const userRole = await userRolesRepository.updateByUserId(userId, data);
    if (!userRole) {
      const error = new Error('User role not found');
      error.status = 404;
      throw error;
    }
    logger.info('User role updated', {
      user: { id: userId },
      role: { id: userRole.roleId },
    });
    return userRolesModel.toPublic(userRole);
  },

  async deleteUserRole(userId) {
    logger.info('User role delete requested', {
      user: { id: userId },
    });
    const userRole = await userRolesRepository.deleteByUserId(userId);
    if (!userRole) {
      const error = new Error('User role not found');
      error.status = 404;
      throw error;
    }
    logger.info('User role deleted', {
      user: { id: userId },
      role: { id: userRole.roleId },
    });
    return userRolesModel.toPublic(userRole);
  },
};

