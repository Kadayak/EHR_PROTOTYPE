import { Router } from "express";

import * as patientService from "./patients.service.js";
import { Patient, PatientRequest, PatientResponse } from "./patient.js";
import authenticateToken from "../../utils/token_auth.js";
import { validateCpr, cprRules } from "../auth/auth.service.js";

export const patientRouter = Router();
patientRouter.use(authenticateToken);

patientRouter.get("/", async (req, res) => {
  try {
    const userCpr = req.user.cpr;
    const patients = await patientService.listPatients(userCpr);

    return res.status(200).json(patients);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

patientRouter.get("/:cpr", async (req, res) => {
  try {
    const { cpr } = req.params;
    const userCpr = req.user.cpr;

    if (!validateCpr(cpr)) return res.status(400).json({ message: cprRules });

    const patient: PatientResponse = await patientService.getPatient(cpr);

    if (!patient)
      return res
        .status(404)
        .json({ message: `Patient with cpr ${cpr} not found` });

    if (patient.homeDoctorCpr !== userCpr)
      return res
        .status(403)
        .json({ message: "Patient is not assigned this doctor" });

    return res.status(200).json(patient);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

patientRouter.post("/", async (req, res) => {
  const patientRequest: PatientRequest = {
    cpr: req.body.cpr,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDate: req.body.birthDate,
    homeDoctorCpr: req.body.homeDoctorCpr,
  };

  const patientResponse = await patientService.createPatient(
    res,
    patientRequest
  );

  return patientResponse;
});
