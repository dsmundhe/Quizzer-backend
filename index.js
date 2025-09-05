// api/index.js
const express = require("express");
const serverless = require("serverless-http");
require("dotenv").config();
const { dbConnection } = require("../db/dbConnection");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors({
  origin: "*",
  credentials: true,
}));

// Connect to MongoDB
dbConnection().then(() => console.log("MongoDB connected successfully"))
              .catch((err) => console.error(err));

// Routes
const userRouter = require("../routes/userRoutes");
const quizRouter = require("../routes/quizRoutes");

app.use("/user", userRouter);
app.use("/quiz", quizRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Wrap Express app for serverless
module.exports.handler = serverless(app);
