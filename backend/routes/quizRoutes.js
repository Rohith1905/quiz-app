const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// Get all questions for the quiz
router.get('/questions', quizController.getQuestions);

// Submit answers and get results
router.post('/submit', quizController.submitAnswers);

// Get quiz metadata
router.get('/info', quizController.getQuizInfo);

module.exports = router;