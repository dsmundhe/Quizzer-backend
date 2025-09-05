// api/index.js
const express = require("express");
const serverless = require("serverless-http");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./db/dbConnection");

// Create Express app
const app = express();
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));

// Connect to MongoDB (cached connection for serverless)
dbConnection()
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

// Routes
const userRouter = require("./routes/userRoutes");
const quizRouter = require("./routes/quizRoutes");

app.use("/user", userRouter);
app.use("/quiz", quizRouter);

// Root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Export the app as a serverless function
module.exports.handler = serverless(app);
