import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { db } from "../../utils/db.server.js";
import { User, UserToken } from "./user.js";

export const signUp = async (cpr: string, password: string) => {
  const hashedPassword: string = await bcrypt.hash(password, 10);
  const user: User = {
    cpr: cpr,
    hashedPassword: hashedPassword,
  };

  return await saveUser(user);
  // return;
};

const saveUser = async (user: User) => {
  return db.users.create({
    data: {
      cpr: user.cpr,
      hashedPassword: user.hashedPassword,
    },
  });
};

export const getUser = async (cpr: string) => {
  return db.users.findUnique({
    where: {
      cpr: cpr, //this should be an Id
    },
  });
};

export const loginUser = async (
  cpr: string,
  password: string
): Promise<User | null> => {
  const user: User = await getUser(cpr);

  if (!user) return;

  const authorized = await bcrypt.compare(password, user.hashedPassword);
  if (authorized) return user;

  return; // TODO what should we return here?
};

export const validateCpr = (cpr: string) => {
  if (!cpr) return false;
  return true;
};

export const cprRules = "Cpr must be a non-empty string";

export const validatePassword = (password: string) => {
  if (!password) return false;
  return true;
};

export const passwordRules = "Password must be ____";

// TOKENS

export const generateAccessToken = (user: UserToken) => {
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });
  return accessToken;
};

export const generateRefreshToken = (user: UserToken) => {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  saveRefreshToken(refreshToken);
  return refreshToken;
};

const saveRefreshToken = async (refreshToken: string) => {
  await db.refreshTokens.create({
    data: {
      token: refreshToken,
    },
  });
};

export const deleteRefreshToken = async (refreshToken: string) => {
  return await db.refreshTokens.delete({
    where: {
      token: refreshToken,
    },
  });
};

export const doesRefreshTokenExist = async (
  refreshToken: string
): Promise<boolean> => {
  const res = await db.refreshTokens.findUnique({
    where: {
      token: refreshToken,
    },
  });

  if (res) return true;
  return false;
};
