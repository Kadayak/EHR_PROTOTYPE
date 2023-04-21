export type Patient = {
  cpr: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  homeDoctorCpr: string;
};

// export type PatientRequest = {
//   firstName: string;
//   lastName: number;
//   birthDate: string;
// };

export type PatientResponse = {
  cpr: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  homeDoctorCpr: string;
};
