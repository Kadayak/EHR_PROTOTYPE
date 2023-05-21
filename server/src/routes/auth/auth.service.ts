import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { db } from "../../utils/db.server.js";
import {
  User,
  UserAuth,
  UserTokenGenerator,
  UserEntity,
  Role,
  toRole,
} from "./user.js";

export const createUser = async (userAuth: UserAuth) => {
  const hashedPassword: string = await bcrypt.hash(userAuth.password, 10);
  const user: User = {
    cpr: userAuth.cpr,
    hashedPassword: hashedPassword,
    role: userAuth.role,
  };

  return user;
};

export const signUp = async (userAuth: UserAuth) => {
  const user = await createUser(userAuth);
  return await saveUser(user);
};

const saveUser = async (user: User) => {
  return await db.users.create({
    data: {
      cpr: user.cpr,
      hashedPassword: user.hashedPassword,
      role: user.role,
    },
  });
};

export const getUser = async (cpr: string) => {
  return await db.users.findUnique({
    where: {
      cpr: cpr,
    },
  });
};

export const loginUser = async (
  cpr: string,
  password: string
): Promise<User | null> => {
  const userEnt: UserEntity = await getUser(cpr);

  if (!userEnt) return;

  const user: User = {
    cpr: userEnt.cpr,
    hashedPassword: userEnt.hashedPassword,
    role: toRole(userEnt.role),
  };

  const authorized = await bcrypt.compare(password, user.hashedPassword);
  if (authorized) return user;

  return;
};

// VALIDATION

export const validateCpr = (cpr: string) => {
  const numberRegex = /^\d{10}$/; // ten numbers
  return numberRegex.test(cpr);
};

export const cprRules = "Cpr must be made up of 10 numbers";

export const validatePassword = (password: string) => {
  if (!password) return false;
  return true;
};

export const passwordRules = "Password must be ____";

// TOKENS

export const generateAccessToken = (user: UserTokenGenerator) => {
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });
  return accessToken;
};

export const generateRefreshToken = (user: UserTokenGenerator) => {
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
