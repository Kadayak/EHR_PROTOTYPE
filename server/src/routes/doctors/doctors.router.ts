import { Router } from "express";
import authenticateToken from "../../utils/token_auth.js";
import { Doctor, DoctorRequest } from "./doctor.js";
import * as doctorService from "./doctors.service.js";

export const doctorRouter = Router();
// doctorRouter.use(authenticateToken);

doctorRouter.get("/", async (req, res) => {
  return await doctorService.getDoctors(res);
});

doctorRouter.post("/", async (req, res) => {
  const doctor: DoctorRequest = {
    cpr: req.body.cpr,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDate: req.body.birthDate,
  };

  const response = await doctorService.createDoctor(res, doctor);
  return response;
});
