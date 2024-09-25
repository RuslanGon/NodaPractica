import createHttpError from "http-errors";
import { Student } from "../db/models/student.js";

export const getAllStudents = async () => {
return await Student.find({});
};


export const getStudentById = async (id) => {
const students =  await Student.findById(id);
if(!students){
throw createHttpError(404, 'student not found');
}
};
