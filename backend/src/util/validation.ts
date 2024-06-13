import Joi from "joi";

export const validateRegister = (data: any) => {
  const schema = Joi.object({
    fullname: Joi.string().min(6).max(255).required(),
    email: Joi.string().email(),
    phone: Joi.string().min(10).max(10).required(),
    password: Joi.string().min(6).max(100).required(),
  });

  return schema.validate(data);
};

export const validateLogin = (data: any) => {
  const schema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(6).max(100).required(),
  });

  return schema.validate(data);
};

