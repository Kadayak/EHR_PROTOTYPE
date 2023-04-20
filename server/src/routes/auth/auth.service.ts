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

const getUser = async (user: User) => {
  return db.users.findUnique({
    where: {
      username: user.username, //this should be an Id
    },
  });
};

export const loginUser = async (username: string, password: string) => {
  const user: User = { username: username, hashedPassword: password };
  const userDb: User = await getUser(user);
  const auth = await bcrypt.compare(password, userDb.hashedPassword);
  return auth;
};

const authenticateUser = async (username, password) => {
  //   const ;
};

export const validatePassword = async (password: string) => {
  return true;
};

export const passwordRules = "Password must be ____";
