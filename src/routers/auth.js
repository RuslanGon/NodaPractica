import { Router } from 'express';

const authRouter = Router();

authRouter.post('/registor');
authRouter.post('/login');
authRouter.post('/refresh-token');
authRouter.post('/logout');

export default authRouter;
