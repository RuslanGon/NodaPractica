import Joi from 'joi';

export const createStudentSchema = Joi.object({
name: Joi.string().required().min(2).max(20),
age: Joi.number().integer().required().min(17),
gender: Joi.string().required().valid('male', 'female', 'other'),
avgMark: Joi.number().required(),
onDuty:Joi.boolean()
});
