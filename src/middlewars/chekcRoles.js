import createHttpError from "http-errors";
import { Student } from "../db/models/student.js";

export const checkRoles =
  (...roles) =>
  async (req, res, next) => {
    const user = req.user;
    const studentId = req.studentId;

    if(!roles.includes(user.role)){
        return next(createHttpError(403, 'Forbidden'));
    }

    if (user.role === 'teacher') {
      return next();
    }

    if (user.role === 'parent') {
      const student = await Student.findOne({
        id: studentId,
        parentId: user._id,
      });

      if (!student) {
        return next(createHttpError(403, 'This is not you child'));
      }
      return next();
    }
    return next(createHttpError(403, 'Insufficient permissions'));
  };
