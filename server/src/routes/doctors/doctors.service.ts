import { Doctor, DoctorRequest } from "./doctor.js";
import * as doctorRepository from "./doctors.repository.js";

export const getDoctors = async (res): Promise<Doctor[]> => {
  const doctors = await doctorRepository.getDoctors();

  return res.status(200).json(doctors);
};

export const getDoctorById = async (res, id: string): Promise<Doctor> => {
  const doctor = await doctorRepository.getDoctor(id);

  if (!doctor)
    return res.status(404).json({ message: `doctor with id ${id} not found` });

  return res.status(200).json(doctor);
};

export const doctorExists = async (id: string): Promise<Boolean> => {
  const doctor = await doctorRepository.getDoctor(id);

  return !!doctor;
};

export const createDoctor = async (
  res,
  doctorRequest: DoctorRequest
): Promise<Doctor> => {
  const doctor: Doctor = {
    cpr: doctorRequest.cpr,
    firstName: doctorRequest.firstName,
    lastName: doctorRequest.lastName,
    birthDate: new Date(doctorRequest.birthDate),
  };
  const doctorResponse = await doctorRepository.createDoctor(doctor);

  return res.status(201).json(doctorResponse);
};
