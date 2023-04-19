import { db } from "../../utils/db.server.js";
import { Patient } from "./patient.js";

type PatientOut = {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
};

export const listPatients = async (): Promise<PatientOut[]> => {
  return db.patients.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      birthDate: true,
    },
  });
};

export const getPatient = async (id: number): Promise<PatientOut | null> => {
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

export const createPatient = async (patient: Patient): Promise<PatientOut> => {
  return db.patients.create({
    data: {
      firstName: patient.firstName,
      lastName: patient.lastName,
      birthDate: patient.birthDate,
    },
  });
};
