import { Router } from "express";
import { signUp, validatePassword, passwordRules } from "./auth.service.js";

export const authRouter = Router();

authRouter.post("/signUp", async (req, res) => {
  const { username, password } = req.body;
  if (username === undefined || username === "")
    return res
      .status(400)
      .json({ message: "username must be a non-empty string" });

  if (!validatePassword(password))
    return res.status(400).json({ message: passwordRules });

  const signUpResponse = await signUp(username, password);

  return res.status(201).json(signUpResponse);
});
