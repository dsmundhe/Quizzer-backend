const mongoose = require('mongoose');
const URI =process.env.MONGODB_URI ||  "mongodb://127.0.0.1:27017/Quizzer-App";

const dbConnection = async () => {
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        throw error; // propagate error
    }
};


 
module.exports={dbConnection}