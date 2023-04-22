import { Router } from "express";

import * as patientService from "./patients.service.js";
import { Patient } from "./patient.js";
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

    const patient = await patientService.getPatient(cpr);

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
  try {
    const { cpr, firstName, lastName, birthDate, homeDoctorCpr } = req.body;

    if (!cpr || !firstName || !lastName || !birthDate || !homeDoctorCpr)
      return res.status(400).json({
        message:
          "Body has to include cpr, firstName, lastName, birthDate and homeDoctorCpr",
      });

    if (!validateCpr(cpr) || !validateCpr(homeDoctorCpr))
      return res.status(400).json({
        message: cprRules,
      });

    let date: Date = new Date(birthDate);
    if (isNaN(Number(date))) {
      return res
        .status(400)
        .json({ message: "birthDate has to be a valid date" });
    }

    const patient: Patient = {
      cpr: cpr,
      firstName: firstName,
      lastName: lastName,
      birthDate: date,
      homeDoctorCpr: homeDoctorCpr,
    };

    const patientResponse = await patientService.createPatient(patient);
    return res.status(201).json(patientResponse);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});
