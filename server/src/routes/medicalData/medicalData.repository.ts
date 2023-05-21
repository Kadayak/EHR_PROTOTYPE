import { db } from "../../utils/db.server.js";

export const getMedicalDataById = async (id: string) => {
  return await db.medicalData.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      patientCpr: true,
    },
  });
};
