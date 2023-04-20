import { db } from "../../utils/db.server.js";
import { Patient, PatientResponse } from "./patient.js";

export const listPatients = async (): Promise<PatientResponse[]> => {
  return db.patients.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      birthDate: true,
    },
  });
};

export const getPatient = async (
  id: number
): Promise<PatientResponse | null> => {
  return db.patients.findUnique({
    where: {
      id: id, // can be shortented to just "id"
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      birthDate: true,
    },
  });
};

export const createPatient = async (
  patient: Patient
): Promise<PatientResponse> => {
  return db.patients.create({
    data: {
      firstName: patient.firstName,
      lastName: patient.lastName,
      birthDate: patient.birthDate,
    },
  });
};
