import { Appointment } from "./appointment.js";
import { isValidDate } from "../../utils/helpers.js";
import * as repository from "./appointments.repository.js";
import {
  getPatient,
  doesPatientExist,
  getPatientEntity,
} from "../patients/patients.service.js";
import { doctorExists, getDoctorEntity } from "../doctors/doctors.service.js";
import { randomUUID } from "crypto";

export const getAppointments = async (res): Promise<Appointment[]> => {
  const entities = await repository.getAppointments();

  return res.status(200).json(entities);
};

export const createAppointment = async (request, res) => {
  const [isValid, status, message] = await isValidAppointmentRequest(request);
  if (!isValid) return res.status(status).json({ message: message });

  const appointment: Appointment = appointmentFromRequest(request);

  const patient = await getPatient(appointment.patientCpr);
  console.log(patient);

  if (patient.homeDoctorCpr != appointment.doctorCpr)
    return res
      .status(400)
      .json({ message: "doctor cpr is not the patient's home doctor's" });

  const entity = await repository.createAppointment(appointment);

  return res.status(201).json(entity);
};

// HELPERS

const isValidAppointmentRequest = async (
  request
): Promise<[boolean, number, string]> => {
  if (request.time === undefined) return [false, 400, "missing 'time' in body"];
  if (request.description === undefined)
    return [false, 400, "missing 'description' in body"];
  if (request.doctorCpr === undefined)
    return [false, 400, "missing 'doctorCpr' in body"];
  if (request.patientCpr === undefined)
    return [false, 400, "missing 'patientCpr' in body"];
  if (request.pending === undefined)
    return [false, 400, "missing 'pending' in body"];
  if (request.approved === undefined)
    return [false, 400, "missing 'approved' in body"];

  if (!isValidDate(request.time))
    return [false, 400, "attribute 'time' has to be a valid date"];

  const patientExists = await doesPatientExist(request.patientCpr);
  if (!patientExists)
    return [
      false,
      404,
      `patient with cpr ${request.patientCpr} does not exist`,
    ];

  const doesDoctorExist = await doctorExists(request.doctorCpr);

  if (!doesDoctorExist)
    return [false, 404, `doctor with cpr ${request.doctorCpr} does not exist`];

  return [true, 0, ""];
};

const appointmentFromRequest = (request): Appointment => {
  return {
    id: randomUUID().toString(),
    time: new Date(request.time),
    description: request.description,
    doctorCpr: request.doctorCpr,
    patientCpr: request.patientCpr,
    pending: request.pending,
    approved: request.approved || false,
  };
};
