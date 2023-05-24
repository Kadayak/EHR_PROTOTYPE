import { db } from "../../utils/db.server.js";
import { Patient, PatientRequest, PatientResponse } from "./patient.js";
import * as patientRepository from "./patients.repository.js";
import * as authService from "../auth/auth.service.js";
import * as doctorService from "../doctors/doctors.service.js";
import { Response } from "express";

export const listPatients = async (
  userCpr: string
): Promise<PatientResponse[]> => {
  return await db.patients.findMany({
    where: {
      homeDoctorCpr: userCpr,
    },
    select: {
      cpr: true,
      firstName: true,
      lastName: true,
      birthDate: true,
      homeDoctorCpr: true,
    },
  });
};

export const getPatient = async (
  cpr: string
): Promise<PatientResponse | null> => {
  return await db.patients.findUnique({
    where: {
      cpr: cpr, // can be shortented to just "cpr"
    },
    select: {
      cpr: true,
      firstName: true,
      lastName: true,
      birthDate: true,
      homeDoctorCpr: true,
    },
  });
};

export const createPatient = async (
  res: Response,
  patientRequest: PatientRequest
): Promise<Response> => {
  if (invalidPatientBody(patientRequest))
    return res.status(400).json({
      message:
        "Body has to include cpr, firstName, lastName, birthDate and homeDoctorCpr",
    });

  if (!authService.validateCpr(patientRequest.cpr))
    return res.status(400).json({
      message: `cpr: ${authService.cprRules}`,
    });

  if (!authService.validateCpr(patientRequest.homeDoctorCpr))
    return res.status(400).json({
      message: `homeDoctorCpr: ${authService.cprRules}`,
    });

  let date: Date = new Date(patientRequest.birthDate);
  if (isNaN(Number(date))) {
    return res
      .status(400)
      .json({ message: "birthDate has to be a valid date" });
  }

  let doctorExists: Boolean = await doctorService.doctorExists(
    patientRequest.homeDoctorCpr
  );

  if (!doctorExists)
    return res.status(404).json({
      message: `doctor with cpr: ${patientRequest.homeDoctorCpr} not found`,
    });

  const patient: Patient = {
    cpr: patientRequest.cpr,
    firstName: patientRequest.firstName,
    lastName: patientRequest.lastName,
    birthDate: date,
    homeDoctorCpr: patientRequest.homeDoctorCpr,
  };
  const patientResponse: PatientResponse =
    await patientRepository.createPatient(patient);

  return res.status(201).json(patientResponse);
};

export const getMedicalData = async (userCpr: string) => {
  return await patientRepository.getMedicalData(userCpr);
};

const invalidPatientBody = (patientRequest: PatientRequest) => {
  if (
    patientRequest.cpr === undefined ||
    patientRequest.firstName === undefined ||
    patientRequest.lastName === undefined ||
    patientRequest.birthDate === undefined ||
    patientRequest.homeDoctorCpr === undefined
  )
    return true;

  return false;
};
