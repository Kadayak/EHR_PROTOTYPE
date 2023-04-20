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

const authenticateUser = async (username, password) => {
  //   const ;
};

export const validatePassword = async (password: string) => {
  return true;
};

export const passwordRules = "Password must be ____";
