import { Router } from "express";
import { cteateStudentController, deleteStudentByIdController, getStudentByIdController, getStudentsController, patchStudentController } from "../controllers/students.js";
import { ctrlWrapper } from "../middlewars/ctrlWrapper.js";

const studentsRouter = Router();

studentsRouter.get('/students', ctrlWrapper(getStudentsController));

studentsRouter.get('/students/:studentId', ctrlWrapper(getStudentByIdController));

studentsRouter.post('/students', ctrlWrapper(cteateStudentController));

studentsRouter.patch('/students/:studentId', ctrlWrapper(patchStudentController));

studentsRouter.delete('/students/:studentId', ctrlWrapper(deleteStudentByIdController));



export default studentsRouter;
