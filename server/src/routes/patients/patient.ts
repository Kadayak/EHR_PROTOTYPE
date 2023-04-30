export type Patient = {
  cpr: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  homeDoctorCpr: string;
};

export type PatientRequest = {
  cpr: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  homeDoctorCpr: string;
};

export type PatientResponse = {
  cpr: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  homeDoctorCpr: string;
};
