const express = require("express");
const app = express();
const cors = require("cors");
const port = 2017;

// Database Connection
const db = require("./db/dbConfig");
app.use(cors());
//Importing userRoutes
const userRoutes = require("./routes/userRoute");
// Importing answerRoute
const answerRoute = require("./routes/answerRoute");
//Importing questionRoutes
const questionRoute = require("./routes/questionRoute");
const { StatusCodes } = require("http-status-codes");
// json middleware to extract json data
app.use(express.json());
// user route middleware
app.use("/api/users", userRoutes);

// Question route middleware
app.use("/api/question", questionRoute);
// Answers Route middleware
app.use("/api/answers", answerRoute);
app.get("/", (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "It is working" });
});
async function start() {
  try {
    const result = await db.execute("select 'test'");
    await app.listen(port);
    console.log("Database Connected Successfully");
    console.log(`Server is Listenning on http://localhost:${port}`);
  } catch (error) {
    console.log(error.message);
  }
}
start();
