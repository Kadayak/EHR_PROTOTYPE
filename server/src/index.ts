import express, { json } from "express";
import * as dotenv from "dotenv";
import logger from "./utils/logger.js";
import cors from "cors";
import { medicalDataRouter } from "./routes/medicalData/medicalData.router.js";
import { patientRouter } from "./routes/patients/patients.router.js";
import { doctorRouter } from "./routes/doctors/doctors.router.js";
import { authRouter } from "./routes/auth/auth.router.js";
import { appointmentRouter } from "./routes/appointments/appointments.router.js";

// initialization

dotenv.config(); // gets all the dotenv variables

if (!process.env.PORT) {
  process.exit();
}

const port: number = parseInt(process.env.PORT as string, 10);

const app = express();
app.use(json());
app.use(logger);
app.use(cors());

app.use("/api/medicalData", medicalDataRouter);
app.use("/api/patients", patientRouter);
app.use("/api/doctors", doctorRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.status(200).json({ hello: "World!" });
});

app.listen(port, () => {
  console.log(`EHR app listening on port ${port}`);
});
