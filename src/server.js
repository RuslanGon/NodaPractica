import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/index.js';
import { notFoundMiddleware } from './middlewars/notFoundMiddleware.js';
import { errorHandlerMiddleware } from './middlewars/errorHandlerMiddleware.js';
import { getAllStudents, getStudentById } from './services/students.js';

export const startServer = () => {
  const app = express();

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cors());

  app.get('/students', async (req, res, next) => {
    const students = await getAllStudents();
    res.json({
      status: 200,
      message: 'successfully get all students',
      data: students
    });
  });

  app.get('/students/:studentId', async (req, res, next) => {
    const id = req.params.studentId;
    const student = await getStudentById(id);
    res.json({
      status: 200,
      message: `successfully get student by ${id}`,
      data: student,
    });
  });

  app.get('/', (req, res, next) => {
    res.send('Hello Ruslan');
  });

  app.get('/error', (req, res, next) => {
    next(new Error('some error here'));
  });

  app.use(notFoundMiddleware);

  app.use(errorHandlerMiddleware);

  const PORT = env(ENV_VARS.PORT, 3000);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${3000}`);
  });
};
