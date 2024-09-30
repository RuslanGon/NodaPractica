import createHttpError from "http-errors";
import { User } from "../db/models/user.js";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { Session } from "../db/models/session.js";


export const createUser = async (payload) => {
const hashPassword = await bcrypt.hash(payload.password, 10);
return await User.create({...payload, password: hashPassword});
};

export const loginUser = async ({email, password}) => {
const user = await User.findOne({email});
if(!user){
throw createHttpError(404, 'User not found');
}

const areEqual = await bcrypt.compare(password, user.password);
if(!areEqual){
    throw createHttpError(401, 'Unathorize');
}

await Session.deleteOne({ userId: user._id });

const accessToken = crypto.randomBytes(20).toString('base64');
const refreshToken = crypto.randomBytes(20).toString('base64');

return await Session.create({
    accessToken,
    refreshToken,
    userId:user._id,
    accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000),
    refreshTokenValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
});

};

export const logoutUser = async ({ sessionId, sessionToken }) => {
  return await Session.deleteOne({
    _id: sessionId,
    refreshToken: sessionToken,
  });
};
