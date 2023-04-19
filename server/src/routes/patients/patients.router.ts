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
    const patient = await patientService.getPatient(id);
    res.status(200).json(patient);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

patientRouter.post("/", async (req, res) => {
  try {
    const { firstName, lastName, birthDate } = req.body;

    if (!firstName || !lastName || !birthDate)
      return res.status(400).json({
        message: "Body has to include firstName, lastName and birthDate",
      });

    if (firstName === "" || lastName === "")
      return res.status(400).json({
        message: "both firstName and lastName have to be non-empty strings",
      });

    let date: Date;
    try {
      date = new Date(birthDate);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "birthDate has to be a valid date" });
    }

    const patientDTO: Patient = {
      firstName: firstName,
      lastName: lastName,
      birthDate: date,
    };

    const patient = await patientService.createPatient(patientDTO);
    return res.status(201).json(patient);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});
