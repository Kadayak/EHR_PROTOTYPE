import express, { json } from "express";
import * as dotenv from "dotenv";
import logger from "./utils/logger.js";

import { patientRouter } from "./routes/patients/patients.router.js";

// initialization

dotenv.config(); // gets all the dotenv variables

if (!process.env.PORT) {
  process.exit();
}

const port: number = parseInt(process.env.PORT as string, 10);

// app

const app = express();
app.use(json());
app.use(logger);

app.get("/", (req, res) => {
  return res.status(200).json({ message: "hello, frontend" });
});

app.use("/patients", patientRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
