export type Doctor = {
  cpr: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
};

export type DoctorRequest = {
  cpr: string;
  firstName: string;
  lastName: string;
  birthDate: string;
};

export type DoctorEntity = {
  cpr: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
};
