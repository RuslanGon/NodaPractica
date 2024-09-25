import { getAllStudents, getStudentById } from "../services/students.js";

export const getStudentsController = async (req, res, next) => {
  const students = await getAllStudents();
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
