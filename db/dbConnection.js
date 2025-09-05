const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI; // must be set in Vercel

const dbConnection = async () => {
  if (!URI) {
    throw new Error("MongoDB URI is not defined. Set MONGODB_URI in Vercel environment variables.");
  }
  
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};

module.exports = { dbConnection };
