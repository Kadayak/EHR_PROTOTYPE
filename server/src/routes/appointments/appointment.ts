import { Doctor } from "../doctors/doctor.js";
import { Patient } from "../patients/patient.js";

export type Appointment = {
  id: string;
  time: Date;
  description: string;
  doctorCpr: string;
  patientCpr: string;
  pending: boolean;
  approved: boolean;
};

export type AppointmentEntity = {
  id: string;
  time: Date;
  description: string;
  doctor: Doctor;
  patient: Patient;
  pending: boolean;
  approved: boolean;
};
