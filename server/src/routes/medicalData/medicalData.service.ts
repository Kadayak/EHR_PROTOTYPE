import { Response } from "express";

import * as medicalDataRepository from "./medicalData.repository.js";

export const getMedicalDataById = async (res: Response, id: string) => {
  const medicalData = await medicalDataRepository.getMedicalDataById(id);

  if (!medicalData) {
    return res
      .status(404)
      .json({ message: `medical data with id: ${id} not found` });
  }

  return res.status(200).json(medicalData);
};
