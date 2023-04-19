const express = require("express");
const app = express();

const logger = require("./logger");
app.use(logger);

app.get("/", (req, res) => {
  return res.status(200).json({ message: "hello, frontend" });
});

const userRouter = require("./routes/users");

app.use("/users", userRouter);

app.listen(3001);
