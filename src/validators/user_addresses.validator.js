import Joi from 'joi';

const uuidSchema = Joi.string().guid({
  version: ['uuidv1', 'uuidv2', 'uuidv3', 'uuidv4', 'uuidv5'],
});

const optionalTrimmedString = Joi.string().trim().max(255).allow(null).empty('');

export const createUserAddressSchema = Joi.object({
  user_id: uuidSchema.required(),
  country_id: uuidSchema.allow(null),
  street: optionalTrimmedString,
  city: optionalTrimmedString,
  postal_code: optionalTrimmedString,
  is_primary: Joi.boolean(),
});

export const updateUserAddressSchema = Joi.object({
  user_id: uuidSchema,
  country_id: uuidSchema.allow(null),
  street: optionalTrimmedString,
  city: optionalTrimmedString,
  postal_code: optionalTrimmedString,
  is_primary: Joi.boolean(),
}).min(1);

