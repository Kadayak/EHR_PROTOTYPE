import { Router } from "express";
import * as patientService from "./patients.service.js";

export const patientRouter = Router();

patientRouter.get("/", async (req, res) => {
  const patients = await patientService.listPatients();
  return res.status(200).json(patients);
});
