import { db } from "../../utils/db.server.js";
import { Patient, PatientResponse } from "./patient.js";

export const createPatient = async (
  patient: Patient
): Promise<PatientResponse> => {
  return await db.patients.create({
    data: {
      cpr: patient.cpr,
      firstName: patient.firstName,
      lastName: patient.lastName,
      birthDate: patient.birthDate,
      homeDoctorCpr: patient.homeDoctorCpr,
    },
  });
};
