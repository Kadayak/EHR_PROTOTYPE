import { db } from "../../utils/db.server.js";

type Patient = {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
};

export const listPatients = async (): Promise<Patient[]> => {
  return db.patients.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      birthDate: true,
    },
  });
};
