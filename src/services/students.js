import createHttpError from 'http-errors';
import { Student } from '../db/models/student.js';

const createPaginationInformation = (page, perPage, count) => {
  const totalPages = Math.ceil(count / perPage);

  return {
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };
};

export const getAllStudents = async ({
  page = 1,
  perPage = 5,
  sortBy = 'id',
  sortOrder = 'asc',
}) => {
  const skip = perPage * (page - 1);
  // const studentsCount = await Student.find().countDocuments();
  // const students = await Student.find().skip(skip).limit(perPage);
  const [studentsCount, students] = await Promise.all([
    Student.find().countDocuments(),
    Student.find().skip(skip).limit(perPage).sort({
      [sortBy]: sortOrder
    })
  ]);

  const informationPagination = createPaginationInformation(
    page,
    perPage,
    studentsCount,
  );
  return {
    students,
    ...informationPagination,
  };
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
