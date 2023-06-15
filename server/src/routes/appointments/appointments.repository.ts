import { db } from "../../utils/db.server.js";
import { Appointment, AppointmentEntity } from "./appointment.js";

export const getAppointments = async (): Promise<AppointmentEntity[]> => {
  const res = db.appointments.findMany({
    select: {
      id: true,
      time: true,
      description: true,
      doctor: true,
      patient: true,
      pending: true,
      approved: true,
    },
  });

  return res;
};

export const createAppointment = async (
  appointment: Appointment
): Promise<Appointment> => {
  const res = await db.appointments.create({
    data: {
      id: appointment.id,
      time: appointment.time,
      description: appointment.description,
      doctorCpr: appointment.doctorCpr,
      patientCpr: appointment.patientCpr,
      pending: appointment.pending,
      approved: appointment.approved,
    },
  });
  return res;
};
