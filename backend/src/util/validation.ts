import Joi from "joi";

export const validateUserRegister = (data: any) => {
  const schema = Joi.object({
    fullname: Joi.string().min(6).max(255).required(),
    email: Joi.string().email(),
    phone: Joi.string().min(10).max(10).required(),
    password: Joi.string().min(6).max(100).required(),
  });

  return schema.validate(data);
};

export const validateUserLogin = (data: any) => {
  const schema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(6).max(100).required(),
  });

  return schema.validate(data);
};

export const validateEmployeeAdd = (data: any) => {
  const schema = Joi.object({
    fullname: Joi.string().min(6).max(255).required(),
    email: Joi.string().email(),
    phone: Joi.string().min(10).max(10).required(),
    nationalId: Joi.string().min(16).max(16).required(),
    password: Joi.string().min(6).max(100).required(),
  });

  return schema.validate(data);
};

export const validateLaptopAdd = (data: any) => {
  const schema = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    brand: Joi.string().min(6).max(255).required(),
    price: Joi.number().required(),
    model: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(data);
};
