// loads default data into our database, so that on initialization, we have some data every time we reset it.

import { db } from "../src/utils/db.server.js";

type User = {
  firstName: string;
  lastName: string;
  birthDate: Date;
};

function getUsers(): Array<User> {
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
    getUsers().map((user) => {
      return db.user.create({
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          birthDate: user.birthDate,
        },
      });
    })
  );
}

seed();
