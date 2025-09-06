const express = require('express');

const { addScore, getScores } = require("../controller/ScoreController");
const { authenticate } = require('../auth/tokenVerify');
const router = express.Router();

router.get('/', authenticate, getScores);
router.post('/', authenticate, addScore);

module.exports = router;