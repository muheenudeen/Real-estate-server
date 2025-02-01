import Joi from 'joi';

export const registerValidation = Joi.object({
  name: Joi.string().required(),
  usertype: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone:Joi.string().min(6).required(),
});
export const loginValidation=Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  })