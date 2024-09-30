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
    const user = await loginUser(req.body);
    res.json({
    status: 200,
    message: 'User is login in',
    data: {user}
    });
    };
