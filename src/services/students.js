import createHttpError from 'http-errors';
import { Student } from '../db/models/student.js';

export const getAllStudents = async () => {
  return await Student.find({});
};

export const getStudentById = async (id) => {
  const student = await Student.findById(id);
  if (!student) {
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

export const upsertStudent = async (id, payload, options = {}) => {
  const rawResult = await Student.findByIdAndUpdate(id, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });
  if (!rawResult || rawResult.value) {
    throw createHttpError(404, 'student not found');
  }
  return {
    student: rawResult.value,
    isNew: !rawResult?.lastErrorObject?.updatedExisting,
  };
};
