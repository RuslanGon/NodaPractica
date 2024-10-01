import { Router } from 'express';
import {
  cteateStudentController,
  deleteStudentByIdController,
  getStudentByIdController,
  getStudentsController,
  patchStudentController,
  putStudentController,
} from '../controllers/students.js';
import { ctrlWrapper } from '../middlewars/ctrlWrapper.js';
import { validateMongoId } from '../middlewars/validateMongoId.js';
import { validateBody } from '../middlewars/validateBody.js';
import { createStudentSchema } from '../validation/createStudentSchema.js';
import { updateStudentSchema } from '../validation/updateStudentSchema.js';
import { authenticate } from '../middlewars/authenticate.js';

const studentsRouter = Router();

studentsRouter.use('/:studentId', validateMongoId('studentId'));
studentsRouter.use('/', authenticate);


studentsRouter.get('/',
ctrlWrapper(getStudentsController));

studentsRouter.get(
  '/:studentId',
  ctrlWrapper(getStudentByIdController),
);

studentsRouter.post('/',
validateBody(createStudentSchema),
ctrlWrapper(cteateStudentController));

studentsRouter.patch(
  '/:studentId',
  validateBody(updateStudentSchema),
  ctrlWrapper(patchStudentController),
);

studentsRouter.put(
  '/:studentId',
  ctrlWrapper(putStudentController),
);

studentsRouter.delete(
  '/:studentId',
  ctrlWrapper(deleteStudentByIdController),
);

export default studentsRouter;
