import express, { json } from "express";
import * as dotenv from "dotenv";
import logger from "./utils/logger.js";
import cors from "cors";
import { patientRouter } from "./routes/patients/patients.router.js";
import { authRouter } from "./routes/auth/auth.router.js";

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
// app.use(corser);
app.use(cors());

app.use("/api/patients", patientRouter);
app.use("/api/auth", authRouter);

/*app.get('/cors', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.send('This has CORS enabled 🎈')
})
*/
app.get('/', (req, res) => {
  res.send('Welcome to CORS server 😁')
})

app.listen(port, () => {
  console.log(`EHR app listening on port ${port}`);
});