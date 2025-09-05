const express = require('express');
const { addQuiz, getQuizzes, updateQuiz, deleteQuiz } = require('../controller/quizController');
const { authenticate } = require('../auth/tokenVerify');

const router = express.Router();

// Public route to get quizzes
router.get('/', getQuizzes);

// Protected routes (JWT required)
router.post('/', authenticate,addQuiz);
router.put('/:id', authenticate, updateQuiz);
router.delete('/:id', authenticate, deleteQuiz);

module.exports = router;
