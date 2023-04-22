import { db } from "../../utils/db.server.js";
import { Patient, PatientResponse } from "./patient.js";

export const listPatients = async (
  userCpr: string
): Promise<PatientResponse[]> => {
  return db.patients.findMany({
    where: {
      homeDoctorCpr: userCpr,
    },
    select: {
      cpr: true,
      firstName: true,
      lastName: true,
      birthDate: true,
      homeDoctorCpr: true,
    },
  });
};

export const getPatient = async (
  cpr: string
): Promise<PatientResponse | null> => {
  return await db.patients.findUnique({
    where: {
      cpr: cpr, // can be shortented to just "cpr"
    },
    select: {
      cpr: true,
      firstName: true,
      lastName: true,
      birthDate: true,
      homeDoctorCpr: true,
    },
  });
};

export const createPatient = async (
  patient: Patient
): Promise<PatientResponse> => {
  return db.patients.create({
    data: {
      cpr: patient.cpr,
      firstName: patient.firstName,
      lastName: patient.lastName,
      birthDate: patient.birthDate,
      homeDoctorCpr: patient.cpr,
    },
  });
};
