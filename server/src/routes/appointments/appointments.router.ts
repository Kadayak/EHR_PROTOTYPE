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
