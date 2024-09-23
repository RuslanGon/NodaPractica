import express from 'express';
import pino from 'pino-http';

const app = express();

app.use(
    pino({
      transport: {
        target: 'pino-pretty', 
      },
    })
  );

app.get('/', (req, res, next) => {
res.send('Hello Ruslan');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});