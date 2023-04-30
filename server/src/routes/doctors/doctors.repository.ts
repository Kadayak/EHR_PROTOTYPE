import { db } from "../../utils/db.server.js";
import { Doctor } from "./doctor.js";

export const getDoctors = async (): Promise<Doctor[]> => {
  return await db.doctors.findMany({
    select: {
      cpr: true,
      firstName: true,
      lastName: true,
      birthDate: true,
    },
  });
};

export const createDoctor = async (doctor: Doctor): Promise<Doctor> => {
  return await db.doctors.create({
    data: {
      cpr: doctor.cpr,
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      birthDate: doctor.birthDate,
    },
  });
};
