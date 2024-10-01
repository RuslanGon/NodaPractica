
import { createUser, loginUser, logoutUser, refreshUser } from "../services/auth.js";

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


export const logoutController = async (req, res, next) => {
   await logoutUser({
    sessionId: req.cookies.sessionId,
    sessoinToken: req.cookies.sessoinToken
   });

    res.clearCookie('sessionId');

    res.clearCookie('sessionToken');

    res.status(204).json({
      status: 200,
      message: 'User is login out',
      data: {},
    });
  };

  export const refreshController = async (req, res, next) => {
    const { sessionId, sessionToken } = req.cookies;
    const session = await refreshUser({ sessionId, sessionToken });

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
