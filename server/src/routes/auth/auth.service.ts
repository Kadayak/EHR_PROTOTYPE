import { db } from "../../utils/db.server.js";
import * as bcrypt from "bcrypt";

type User = {
  username: string;
  hashedPassword: string;
};

export const signUp = async (username: string, password: string) => {
  const hashedPassword: string = await bcrypt.hash(password, 10);
  const user: User = {
    username: username,
    hashedPassword: hashedPassword,
  };

  return await saveUser(user);
};

const saveUser = async (user: User) => {
  return db.users.create({
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
): Promise<boolean> => {
  const user: User = { username: username, hashedPassword: password };
  const userDb: User = await getUser(user.username);

  return await bcrypt.compare(password, userDb.hashedPassword);
};

export const validatePassword = async (password: string) => {
  return true;
};

export const passwordRules = "Password must be ____";
