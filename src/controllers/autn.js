
import { createUser, loginUser } from "../services/auth.js";

export const registorController = async (req, res, next) => {
const user = await createUser(req.body);
res.json({
status: 200,
message: 'User is created',
data: {user}
});
};


export const loginController = async (req, res, next) => {
  const session = await loginUser(req.body);

  res.cookie('sessionId', session.id, {
    httpOnly: true,
    expire: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 дней
  });

  res.cookie('sessionToken', session.refreshToken, {
    httpOnly: true,
    expire: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 дней
  });

  res.json({
    status: 200,
    message: 'User is login in',
    data: { accessToken: session.accessToken },
  });
};
