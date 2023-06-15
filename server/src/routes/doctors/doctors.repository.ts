import { Doctors } from "@prisma/client";
import { db } from "../../utils/db.server.js";
import { Doctor } from "./doctor.js";

export const getDoctors = async (): Promise<Doctor[]> => {
  const res = await db.doctors.findMany({
    select: {
      cpr: true,
      firstName: true,
      lastName: true,
      birthDate: true,
    },
  });

  return res;
};

export const getDoctor = async (cpr): Promise<Doctor> => {
  return await db.doctors.findUnique({
    where: {
      cpr: cpr,
    },
    select: {
      cpr: true,
      firstName: true,
      lastName: true,
      birthDate: true,
    },
  });
};

export const getDoctorEntity = async (cpr: string): Promise<Doctors> => {
  return await db.doctors.findUnique({
    where: {
      cpr: cpr,
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
