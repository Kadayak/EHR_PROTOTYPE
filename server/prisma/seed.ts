// loads default data into our database, so that on initialization, we have some data every time we reset it.

import { db } from "../src/utils/db.server.js";
import { Patient } from "../src/routes/patients/patient.js";

function getPatients(): Array<Patient> {
  return [
    {
      firstName: "Kristófer Fannar",
      lastName: "Björnsson",
      birthDate: new Date("03-05-2002"), // MM-DD-YYYY
    },
    {
      firstName: "Logi",
      lastName: "Sigurðarson",
      birthDate: new Date("07-14-2002"),
    },
  ];
}

async function seed() {
  await Promise.all(
    getPatients().map((patient) => {
      return db.patients.create({
        data: {
          firstName: patient.firstName,
          lastName: patient.lastName,
          birthDate: patient.birthDate,
        },
      });
    })
  );
}

seed();
