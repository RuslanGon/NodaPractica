import { createStudent, deleteStudent, getAllStudents, getStudentById, upsertStudent } from "../services/students.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";

export const getStudentsController = async (req, res, next) => {
const {page, perPage} = parsePaginationParams(req.query);
const students = await getAllStudents({page, perPage});
  res.json({
    status: 200,
    message: 'successfully get all students',
    data: students,
  });
};


export const getStudentByIdController = async (req, res, next) => {
    const id = req.params.studentId;
    const student = await getStudentById(id);

    if (!student) {
      return res.status(404).json({
        status: 404,
        message: `Student with ID ${id} not found`,
      });
    }

    res.json({
      status: 200,
      message: `successfully get student by ${id}`,
      data: student,
    });
  }  ;


  export const cteateStudentController = async (req, res, next) => {
    const { body } = req;
    const student = await createStudent(body);

    res.status(201).json({
      status: 201,
      message: 'successfully create new student',
      data: student,
    });
  };


 export const deleteStudentByIdController = async (req, res, next) => {
  const id = req.params.studentId;
  await deleteStudent(id);
  res.status(204).send();
};

export const patchStudentController = async (req, res, next) => {
  const { body } = req;
  const { studentId } = req.params;
  const student = await upsertStudent(body, studentId);

  res.status(200).json({
    status: 200,
    message: 'successfully patched student',
    data: student,
  });
};


export const putStudentController = async (req, res, next) => {
  const { body } = req;
  const { studentId } = req.params;
  const { isNew, student } = await upsertStudent(body, studentId, {
    upsert: true,
  });
  const status = isNew ? 201 : 200;
  res.status(status).json({
    status: 200,
    message: 'successfully put student',
    data: student,
  });
};

