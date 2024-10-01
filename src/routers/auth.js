import { Router } from 'express';
import { ctrlWrapper } from '../middlewars/ctrlWrapper.js';
import { loginController, logoutController, refreshController, registorController } from '../controllers/autn.js';
import { validateBody } from '../middlewars/validateBody.js';
import { registorSchema } from '../validation/registorSchema.js';
import { loginSchema } from '../validation/loginSchema.js';

const authRouter = Router();

authRouter.post('/registor', validateBody(registorSchema), ctrlWrapper(registorController));
authRouter.post('/login', validateBody(loginSchema), ctrlWrapper(loginController));
authRouter.post('/refresh-token', ctrlWrapper(refreshController));
authRouter.post('/logout', ctrlWrapper(logoutController));

export default authRouter;
