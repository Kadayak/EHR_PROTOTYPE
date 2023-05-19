import { Router } from "express";

import * as patientService from "./patients.service.js";
import { Patient, PatientRequest, PatientResponse } from "./patient.js";
import authenticateToken from "../../utils/token_auth.js";
import { validateCpr, cprRules } from "../auth/auth.service.js";
import { toRole, Role } from "../auth/user.js";

export const patientRouter = Router();
patientRouter.use(authenticateToken);

patientRouter.get("/", async (req, res) => {
  const userCpr = req.user.cpr;

  // if ?self=true is set, this is the patient requesting their own data.
  const self = Boolean(req.query.self);

  if (self) {
    const medicalHistory = await patientService.getMedicalData(userCpr);
    return res.status(200).json(medicalHistory);
  }

  const userRole: Role = toRole(req.user.role);
  if (userRole !== Role.Doctor) {
    res
      .status(401)
      .json({ message: "Only doctors are allowed access to patients" });
  }

  const patients = await patientService.listPatients(userCpr);

  return res.status(200).json(patients);
});

patientRouter.get("/:cpr", async (req, res) => {
  const userRole: Role = toRole(req.user.role);
  const { cpr } = req.params;
  const userCpr = req.user.cpr;

  if (userRole !== Role.Doctor && cpr !== userCpr) {
    res
      .status(401)
      .json({ message: "Only doctors are allowed access to patients" });
  }

  if (!validateCpr(cpr)) return res.status(400).json({ message: cprRules });

  const patient: PatientResponse = await patientService.getPatient(cpr);

  if (!patient)
    return res
      .status(404)
      .json({ message: `Patient with cpr ${cpr} not found` });

  if (patient.homeDoctorCpr !== userCpr && cpr !== userCpr)
    return res
      .status(403)
      .json({ message: "Patient is not assigned this doctor" });

  return res.status(200).json(patient);
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
