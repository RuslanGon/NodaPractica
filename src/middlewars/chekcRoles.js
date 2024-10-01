import createHttpError from "http-errors";
import { Student } from "../db/models/student.js";

export const checkRoles =
  (...roles) =>
  async (req, res, next) => {
    const user = req.user;
    const studetnId = req.studetnId;

    if (roles.includes('teacher') && user.role === 'teacher') {
      return next();
    }

    if (roles.includes('parent') && user.role === 'parent') {
      const student = await Student.find({
        id: studetnId,
        paretId: user._id,
      });

      if (!student) {
        return next(createHttpError(403, 'This is not you child'));
      }
      return next();
    }
    return next(createHttpError(403, 'Forbbiden'));
  };
