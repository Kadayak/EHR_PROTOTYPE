import { Router } from "express";
import jwt from "jsonwebtoken";

import * as authService from "./auth.service.js";
import { User, UserToken } from "./user.js";
import authenticateToken from "../../utils/token_auth.js";

export const authRouter = Router();

authRouter.post("/signUp", async (req, res) => {
  const { cpr, password } = req.body;

  if (!authService.validateCpr(cpr))
    return res.status(400).json({ message: authService.cprRules });

  if (!authService.validatePassword(password))
    return res.status(400).json({ message: authService.passwordRules });

  const userExists = await authService.getUser(cpr);
  if (userExists)
    return res
      .status(400)
      .json({ message: `user with cpr ${cpr} already exists` });

  const _ = await authService.signUp(cpr, password);

  return res.status(201).json({ message: "User created!" });
  // return res.status(201).json({ message: _ });
});

authRouter.post("/login", async (req, res) => {
  const { cpr, password } = req.body;
  if (!authService.validateCpr(cpr)) {
    return res.status(400).json({ message: authService.cprRules });
  }

  const user: User = await authService.loginUser(cpr, password);

  if (!user) {
    return res
      .status(400)
      .json({ message: "User not found with this cpr and password" });
  }

  const userToken: UserToken = { cpr: user.cpr };

  const accessToken = authService.generateAccessToken(userToken);
  const refreshToken = authService.generateRefreshToken(userToken);

  return res
    .status(201)
    .json({ accessToken: accessToken, refreshToken: refreshToken });
});

authRouter.delete("/logout", authenticateToken, async (req, res) => {
  const refreshToken: string = req.body.token;
  console.log(refreshToken);

  if (!refreshToken)
    res.status(400).json({ message: "body has to include token" });

  const _ = await authService.deleteRefreshToken(refreshToken);

  res.status(200).json({ message: "OK" });
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

    const userToken: UserToken = { cpr: user.name };
    const accessToken = authService.generateAccessToken(userToken);

    res.status(201).json({ accessToken: accessToken });
  });
});
