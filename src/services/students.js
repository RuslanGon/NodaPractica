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
  filter = {},
  userId
}) => {
  const skip = perPage * (page - 1);
  const filterQuery = {};

  if (filter.minAge) {
    filterQuery.age = { $gte: filter.minAge };
  }

  if (filter.maxAge) {
    filterQuery.age = filterQuery.age ? { ...filterQuery.age, $lte: filter.maxAge } : { $lte: filter.maxAge };
  }

  if (filter.minAvgMark) {
    filterQuery.avgMark = { $gte: filter.minAvgMark };
  }

  if (filter.maxAvgMark) {
    filterQuery.avgMark = filterQuery.avgMark ? { ...filterQuery.avgMark, $lte: filter.maxAvgMark } : { $lte: filter.maxAvgMark };
  }

  if (filter.gender) {
    filterQuery.gender = filter.gender;
  }

  if (typeof filter.onDuty !== 'undefined') {
    filterQuery.onDuty = filter.onDuty;
  }

  filterQuery.where('parentId').equals(userId);

  const [studentsCount, students] = await Promise.all([
    Student.find(filterQuery).countDocuments(),
    Student.find(filterQuery).skip(skip).limit(perPage).sort({
      [sortBy]: sortOrder
    }).exec(),
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

export const createStudent = async (payload, userId) => {
  const student = await Student.create(...{payload, parentId: userId});
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
