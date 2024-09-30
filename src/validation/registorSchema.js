import Joi from 'joi';

export const registorSchema = Joi.object({
name: Joi.string().required().min(2).max(20),
password: Joi.string().required(),
email: Joi.string().required().email(),

});
