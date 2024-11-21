import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/index.js';
import { notFoundMiddleware } from './middlewars/notFoundMiddleware.js';
import { errorHandlerMiddleware } from './middlewars/errorHandlerMiddleware.js';
import studentsRouter from './routers/students.js';

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

  app.use(express.json());

  app.use(studentsRouter);

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
