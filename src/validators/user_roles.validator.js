import Joi from 'joi';

const uuidSchema = Joi.string().guid({
  version: ['uuidv1', 'uuidv2', 'uuidv3', 'uuidv4', 'uuidv5'],
});

const assignedAtSchema = Joi.date().iso().allow(null);

export const createUserRoleSchema = Joi.object({
  user_id: uuidSchema.required(),
  role_id: uuidSchema.required(),
  assigned_at: assignedAtSchema,
});

export const updateUserRoleSchema = Joi.object({
  role_id: uuidSchema,
  assigned_at: assignedAtSchema,
}).min(1);

