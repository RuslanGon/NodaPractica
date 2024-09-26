import createHttpError from 'http-errors';
import { Types } from 'mongoose';

export const validateMongoId = (idName = '') => (req, res, next) => {
  const id = req.params[idName];

  if(!id){
throw new Error('id in validation is not provided');
  }

  if (!Types.ObjectId.isValid(id)) {
    return next(createHttpError(400, 'invalid id'));
  }
  return next();
};
