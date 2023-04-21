import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { db } from "../../utils/db.server.js";
import { User, UserToken } from "./user.js";

export const signUp = async (username: string, password: string) => {
  const hashedPassword: string = await bcrypt.hash(password, 10);
  const user: User = {
    username: username,
    hashedPassword: hashedPassword,
  };

  await saveUser(user);
  return;
};

const saveUser = async (user: User) => {
  db.users.create({
    data: {
      username: user.username,
      hashedPassword: user.hashedPassword,
    },
  });
};

export const getUser = async (username: string) => {
  return db.users.findUnique({
    where: {
      username: username, //this should be an Id
    },
  });
};

export const loginUser = async (
  username: string,
  password: string
): Promise<User | null> => {
  const user: User = await getUser(username);

  if (!user) return;

  const authorized = await bcrypt.compare(password, user.hashedPassword);
  if (authorized) return user;

  return; // TODO what should we return here?
};

export const validatePassword = async (password: string) => {
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
