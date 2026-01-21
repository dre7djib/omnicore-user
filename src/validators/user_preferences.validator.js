import Joi from 'joi';

const uuidSchema = Joi.string().guid({
  version: ['uuidv1', 'uuidv2', 'uuidv3', 'uuidv4', 'uuidv5'],
});

const optionalTrimmedString = Joi.string().trim().max(255).allow(null).empty('');

export const createUserPreferenceSchema = Joi.object({
  user_id: uuidSchema.required(),
  language: optionalTrimmedString,
  timezone: optionalTrimmedString,
  notifications_enabled: Joi.boolean(),
});

export const updateUserPreferenceSchema = Joi.object({
  user_id: uuidSchema,
  language: optionalTrimmedString,
  timezone: optionalTrimmedString,
  notifications_enabled: Joi.boolean(),
}).min(1);

