const mongoose = require("mongoose");

const QuizApiSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Quiz title is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "User email is required"],
            lowercase: true,
            trim: true,
            match: [/.+@.+\..+/, "Please enter a valid email"],
        },
        topic: {
            type: String,
            required: [true, "Quiz topic is required"],
            trim: true,
        },
        testApis: {
            type: Array, // store an array of quiz question objects instead of string
            required: [true, "Quiz data is required"],
            default: [],
        },
    },
    {
        timestamps: true,
        versionKey: false, // optional: removes __v field
    }
);

const QuizApis = mongoose.model("QuizApis", QuizApiSchema);

module.exports = { QuizApis };
