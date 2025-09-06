const mongoose = require('mongoose');

const ScoreStore = new mongoose.Schema({
    score: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    }
}, { timestamps: true })

const ScoreStoreModel = mongoose.model('scores', ScoreStore);

module.exports = { ScoreStoreModel };