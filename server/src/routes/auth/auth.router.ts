import { Router } from "express";
import jwt from "jsonwebtoken";

import * as authService from "./auth.service.js";
import { User, UserToken } from "./user.js";

export const authRouter = Router();

authRouter.post("/signUp", async (req, res) => {
  const { username, password } = req.body;
  if (!username)
    return res
      .status(400)
      .json({ message: "username must be a non-empty string" });

  if (!authService.validatePassword(password))
    return res.status(400).json({ message: authService.passwordRules });

  const userWithUsername = await authService.getUser(username);
  if (userWithUsername)
    return res
      .status(400)
      .json({ message: `user with username ${username} already exists` });

  const signUpResponse = await authService.signUp(username, password);

  return res.status(201).json({ message: "User created!" });
});

authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    return res
      .status(400)
      .json({ message: "username must be a non-empty string" });
  }

  const user: User = await authService.loginUser(username, password);
  if (!user) {
    return res
      .status(400)
      .json({ message: "User not found with this email and password" });
  }

  const userToken: UserToken = { username: user.username };

  const accessToken = authService.generateAccessToken(userToken);
  const refreshToken = authService.generateRefreshToken(userToken);

  return res
    .status(201)
    .json({ accessToken: accessToken, refreshToken: refreshToken });
});

// TOKENS

authRouter.post("/token", async (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken)
    return res.status(401).json({ message: "Refresh token not provided" });

  const refreshTokenExists = await authService.doesRefreshTokenExist(
    refreshToken
  );

  if (!refreshTokenExists)
    return res.status(403).json({ message: "Refresh token incorrect" });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: err.message });

    const userToken: UserToken = { username: user.name };
    const accessToken = authService.generateAccessToken(userToken);

    res.status(201).json({ accessToken: accessToken });
  });
});
