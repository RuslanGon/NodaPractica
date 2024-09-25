import createHttpError from "http-errors";
import { Student } from "../db/models/student.js";

export const getAllStudents = async () => {
return await Student.find({});
};


export const getStudentById = async (id) => {
  const students = await Student.findById(id);
  if (!students) {
    throw createHttpError(404, 'student not found');
  }
};

export const createStudent = async (payload) => {
    const student = await Student.create(payload);
    return student;
  };


  export const deleteStudent = async (studentId) => {
    await Student.findByIdAndDelete(studentId);
  };
