// loads default data into our database, so that on initialization, we have some data every time we reset it.

import { db } from "../src/utils/db.server.js";
import { Patient } from "../src/routes/patients/patient.js";
import { Doctor } from "../src/routes/doctors/doctor.js";

function getPatients(): Patient[] {
  return [
    {
      cpr: "0503023180",
      firstName: "Kristófer Fannar",
      lastName: "Björnsson",
      birthDate: new Date("03-05-2002"), // MM-DD-YYYY
      homeDoctorCpr: "0101702021",
    },
    {
      cpr: "1407022830",
      firstName: "Logi",
      lastName: "Sigurðarson",
      birthDate: new Date("07-14-2002"),
      homeDoctorCpr: "0101802020",
    },
  ];
}

const getDoctors = (): Doctor[] => {
  return [
    {
      cpr: "0101802020",
      firstName: "John",
      lastName: "Doe",
      birthDate: new Date("01-01-1980"),
    },
    {
      cpr: "0101702021",
      firstName: "Jane",
      lastName: "Doe",
      birthDate: new Date("01-01-1970"),
    },
  ];
};

async function seed() {
  await Promise.all(
    getDoctors().map((doctor) => {
      return db.doctors.create({
        data: {
          cpr: doctor.cpr,
          firstName: doctor.firstName,
          lastName: doctor.lastName,
          birthDate: doctor.birthDate,
        },
      });
    })
  );

  await Promise.all(
    getPatients().map((patient) => {
      return db.patients.create({
        data: {
          cpr: patient.cpr,
          firstName: patient.firstName,
          lastName: patient.lastName,
          birthDate: patient.birthDate,
          homeDoctorCpr: patient.homeDoctorCpr,
        },
      });
    })
  );
}

seed();
