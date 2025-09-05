const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // optional but recommended
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Correct order: model name first, then schema
const UserModel = mongoose.model('User', UserSchema);

module.exports = { UserModel };
