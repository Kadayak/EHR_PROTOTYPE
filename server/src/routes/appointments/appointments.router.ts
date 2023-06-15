import { Router } from "express";

import * as service from "./appointments.service.js";

export const appointmentRouter = Router();

appointmentRouter.get("/", async (req, res) => {
  return await service.getAppointments(res);
});

appointmentRouter.post("/", async (req, res) => {
  const appointment = req.body;

  return await service.createAppointment(appointment, res);
});

appointmentRouter.get("/*/patients/:patientId", async (req, res) => {
  const { patientId } = req.params;

  return await service.getAppointmentsForPatient(res, patientId);
});

appointmentRouter.get("/*/doctors/:doctorId", async (req, res) => {
  const { doctorId } = req.params;

  return await service.getAppointmentsForPatient(res, doctorId);
});
