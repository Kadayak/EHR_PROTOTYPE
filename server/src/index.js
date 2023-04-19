import express, { json } from "express";
const app = express();
app.use(json());

const port = 3001;

import logger from "./logger";
app.use(logger);

app.get("/", (req, res) => {
  return res.status(200).json({ message: "hello, frontend" });
});

import userRouter from "./routes/users";

app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
