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

appointmentRouter.get("/all/patients/:patientId", async (req, res) => {
  const { patientId } = req.params;

  return await service.getAppointmentsForPatient(res, patientId);
});

appointmentRouter.get("/all/doctors/:doctorId", async (req, res) => {
  const { doctorId } = req.params;

  return await service.getAppointmentsForDoctor(res, doctorId);
});

appointmentRouter.get("/:appointmentId/doctors/:doctorId", async (req, res) => {
  const { appointmentId, doctorId } = req.params;

  const approve: boolean = req.query.approve == "true"; // change to boolean

  return await service.resolveAppointment(
    res,
    appointmentId,
    approve,
    doctorId
  );
});
