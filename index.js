const express = require("express");
require("dotenv").config();
const { dbConnection } = require("./db/dbConnection");
const cors=require('cors');

const app = express();
app.use(express.json());

app.use(cors({
  origin: "*", // frontend URL
  credentials: true,               // if you use cookies
}));

const PORT = process.env.PORT || 4000;

// Routes
const userRouter = require("./routes/userRoutes");
app.use("/user", userRouter); // Corrected route prefix


const quizRouter = require('./routes/quizRoutes');
app.use('/quiz', quizRouter);


const storeResult = require('./routes/storeResult');
app.use('/score', storeResult);


// Connect to MongoDB
dbConnection()
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

// Root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
