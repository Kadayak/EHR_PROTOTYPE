import { Router } from "express";
import jwt from "jsonwebtoken";

import * as authService from "./auth.service.js";
import * as patientService from "../patients/patients.service.js";
import * as doctorService from "../doctors/doctors.service.js";
import { User, UserTokenGenerator, Role, UserAuth, toRole } from "./user.js";
import { Patient, PatientRequest } from "../patients/patient.js";
import { Doctor, DoctorRequest } from "../doctors/doctor.js";

export const authRouter = Router();

authRouter.post("/signUp", async (req, res) => {
  const userAuth: UserAuth = {
    cpr: req.body.cpr,
    password: req.body.password,
    role: req.body.role,
  };

  if (!authService.validateCpr(userAuth.cpr))
    return res.status(400).json({ message: authService.cprRules });

  if (!authService.validatePassword(userAuth.password))
    return res.status(400).json({ message: authService.passwordRules });

  const userExists = await authService.getUser(userAuth.cpr);
  if (userExists)
    return res
      .status(400)
      .json({ message: `user with cpr ${userAuth.cpr} already exists` });

  const _ = await authService.signUp(userAuth);

  // ROLE HANDLING
  const role: Role = toRole(req.body.role); // test this

  if (role === Role.Doctor) {
    console.log("doctor seen");
    const doctor: DoctorRequest = {
      cpr: req.body.cpr,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
    };

    const response = await doctorService.createDoctor(res, doctor);
    return response;
  } else if (role === Role.Patient) {
    console.log("patient seen");

    const patient: PatientRequest = {
      cpr: req.body.cpr,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
      homeDoctorCpr: req.body.homeDoctorCpr,
    };

    const response = await patientService.createPatient(res, patient);
    return response;
  }

  return res.status(404).json({ message: `Role ${role} not found` });
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

  const userToken: UserTokenGenerator = { cpr: user.cpr };

  const accessToken = authService.generateAccessToken(userToken);
  const refreshToken = authService.generateRefreshToken(userToken);

  return res
    .status(201)
    .json({ accessToken: accessToken, refreshToken: refreshToken });
});

authRouter.delete("/logout", async (req, res) => {
  const refreshToken: string = req.body.token;

  if (!refreshToken)
    res.status(400).json({ message: "body has to include token" });

  const _ = await authService.deleteRefreshToken(refreshToken); //TODO handle if refresh token was not found -> couldnt be deleted.

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

    const userToken: UserTokenGenerator = { cpr: user.cpr };
    const accessToken = authService.generateAccessToken(userToken);

    res.status(201).json({ accessToken: accessToken });
  });
});
