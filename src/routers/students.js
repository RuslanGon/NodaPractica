import { Router } from "express";
import { cteateStudentController, deleteStudentByIdController, getStudentByIdController, getStudentsController, patchStudentController, putStudentController } from "../controllers/students.js";
import { ctrlWrapper } from "../middlewars/ctrlWrapper.js";
import { validateMongoId } from "../middlewars/validateMongoId.js";

const studentsRouter = Router();

studentsRouter.get('/students', ctrlWrapper(getStudentsController));

studentsRouter.get('/students/:studentId',validateMongoId, ctrlWrapper(getStudentByIdController));

studentsRouter.post('/students', ctrlWrapper(cteateStudentController));

studentsRouter.patch('/students/:studentId', validateMongoId, ctrlWrapper(patchStudentController));

studentsRouter.put('/students/:studentId',validateMongoId, ctrlWrapper(putStudentController));

studentsRouter.delete('/students/:studentId', validateMongoId, ctrlWrapper(deleteStudentByIdController));



export default studentsRouter;
