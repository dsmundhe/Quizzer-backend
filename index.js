// api/index.js
const express = require("express");
const serverless = require("serverless-http");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

// MongoDB connection
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
  }
};

dbConnection();

// Create Express app
const app = express();
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));

// Routes
const userRouter = require("../routes/userRoutes");
const quizRouter = require("../routes/quizRoutes");

app.use("/user", userRouter);
app.use("/quiz", quizRouter);

// Root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Export for Vercel serverless
module.exports.handler = serverless(app);
