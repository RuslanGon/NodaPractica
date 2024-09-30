import { Router } from 'express';
import { ctrlWrapper } from '../middlewars/ctrlWrapper.js';
import { registorController } from '../controllers/autn.js';
import { validateBody } from '../middlewars/validateBody.js';
import { registorSchema } from '../validation/registorSchema.js';

const authRouter = Router();

authRouter.post('/registor', validateBody(registorSchema), ctrlWrapper(registorController));
authRouter.post('/login');
authRouter.post('/refresh-token');
authRouter.post('/logout');

export default authRouter;
