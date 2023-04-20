import { Router } from "express";
import {
  signUp,
  loginUser,
  getUser,
  validatePassword,
  passwordRules,
} from "./auth.service.js";

export const authRouter = Router();

authRouter.post("/signUp", async (req, res) => {
  const { username, password } = req.body;
  if (!username)
    return res
      .status(400)
      .json({ message: "username must be a non-empty string" });

  if (!validatePassword(password))
    return res.status(400).json({ message: passwordRules });

  const userWithUsername = await getUser(username);
  if (userWithUsername)
    return res
      .status(400)
      .json({ message: `user with username ${username} already exists` });

  const signUpResponse = await signUp(username, password);

  return res.status(201).json(signUpResponse);
});

authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    return res
      .status(400)
      .json({ message: "username must be a non-empty string" });
  }

  const auth = await loginUser(username, password);
  if (!auth) {
    return res.status(400).json({ message: "Incorrect login information" });
  }
  return res.status(201).json(auth);
});
