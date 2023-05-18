import { db } from "../../utils/db.server.js";
import { Patient, PatientRequest, PatientResponse } from "./patient.js";
import * as patientRepository from "./patients.repository.js";
import * as authService from "../auth/auth.service.js";
import { Response } from "express";

export const listPatients = async (
  userCpr: string
): Promise<PatientResponse[]> => {
  return db.patients.findMany({
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
  if (invalidPatientRequest(patientRequest))
    return res.status(400).json({
      message:
        "Body has to include cpr, firstName, lastName, birthDate and homeDoctorCpr",
    });

  if (
    !authService.validateCpr(patientRequest.cpr) ||
    !authService.validateCpr(patientRequest.homeDoctorCpr)
  )
    return res.status(400).json({
      message: authService.cprRules,
    });

  let date: Date = new Date(patientRequest.birthDate);
  if (isNaN(Number(date))) {
    return res
      .status(400)
      .json({ message: "birthDate has to be a valid date" });
  }

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

const invalidPatientRequest = (patientRequest: PatientRequest) => {
  return false;
};
