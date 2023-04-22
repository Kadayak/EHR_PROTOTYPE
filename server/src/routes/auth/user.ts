export type User = {
  cpr: string;
  hashedPassword: string;
  role: Role;
};

export type UserEntity = {
  cpr: string;
  hashedPassword: string;
  role: string;
};

export type UserToken = {
  cpr: string;
  iat: string;
  exp: string;
};

export type UserTokenGenerator = {
  cpr: string;
};

export type UserAuth = {
  cpr: string;
  password: string;
  role: Role;
};

export const enum Role {
  Patient = "patient",
  Doctor = "doctor",
}

export const toRole = (role: string): Role => {
  if (role === "patient") return Role.Patient;
  if (role === "doctor") return Role.Doctor;
};
