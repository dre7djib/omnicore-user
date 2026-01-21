import Joi from 'joi';

const uuidSchema = Joi.string().guid({
  version: ['uuidv1', 'uuidv2', 'uuidv3', 'uuidv4', 'uuidv5'],
});

const optionalTrimmedString = Joi.string().trim().max(255).empty('');

export const createUserSchema = Joi.object({
  country_id: uuidSchema.required(),
  first_name: optionalTrimmedString,
  last_name: optionalTrimmedString,
  phone_number: Joi.string().trim().max(50).empty(''),
  status: Joi.string().trim().max(50).empty(''),
});

export const updateUserSchema = Joi.object({
  country_id: uuidSchema,
  first_name: optionalTrimmedString,
  last_name: optionalTrimmedString,
  phone_number: Joi.string().trim().max(50).empty(''),
  status: Joi.string().trim().max(50).empty(''),
}).min(1);

