import { Router } from "express";
import * as patientService from "./patients.service.js";
import { Patient } from "./patient.js";

export const patientRouter = Router();

patientRouter.get("/", async (req, res) => {
  try {
    const patients = await patientService.listPatients();
    return res.status(200).json(patients);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

patientRouter.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id < 0)
      return res
        .status(400)
        .json({ message: "id has to be a non-negative number" });

    const patient = await patientService.getPatient(id);

    if (!patient)
      return res
        .status(404)
        .json({ message: `Patient with id ${id} not found` });

    res.status(200).json(patient);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

patientRouter.post("/", async (req, res) => {
  try {
    const { firstName, lastName, birthDate } = req.body;

    if (
      firstName === undefined ||
      lastName === undefined ||
      birthDate === undefined
    )
      return res.status(400).json({
        message: "Body has to include firstName, lastName and birthDate",
      });

    if (firstName === "" || lastName === "")
      return res.status(400).json({
        message: "both firstName and lastName have to be non-empty strings",
      });

    let date: Date = new Date(birthDate);
    if (isNaN(Number(date))) {
      return res
        .status(400)
        .json({ message: "birthDate has to be a valid date" });
    }

    const patient: Patient = {
      firstName: firstName,
      lastName: lastName,
      birthDate: date,
    };

    const patientResponse = await patientService.createPatient(patient);
    return res.status(201).json(patientResponse);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});
