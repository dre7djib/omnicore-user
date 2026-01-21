import Joi from 'joi';

const uuidSchema = Joi.string().guid({
  version: ['uuidv1', 'uuidv2', 'uuidv3', 'uuidv4', 'uuidv5'],
});

const actionSchema = Joi.string().trim().min(1).max(255);

const createdAtSchema = Joi.date().iso().allow(null);

export const createUserAuditLogSchema = Joi.object({
  user_id: uuidSchema.required(),
  action: actionSchema.required(),
  performed_by: uuidSchema.allow(null),
  created_at: createdAtSchema,
});

export const updateUserAuditLogSchema = Joi.object({
  user_id: uuidSchema,
  action: actionSchema,
  performed_by: uuidSchema.allow(null),
  created_at: createdAtSchema,
}).min(1);

