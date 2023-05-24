import { Router } from "express";
import authenticateToken from "../../utils/token_auth.js";

import * as medicalDataService from "./medicalData.service.js";

export const medicalDataRouter = Router();

medicalDataRouter.use(authenticateToken);

medicalDataRouter.get("/:id", (req, res) => {
  const { id } = req.params;

  return medicalDataService.getMedicalDataById(res, id);
});
