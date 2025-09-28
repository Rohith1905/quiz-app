const Question = require('../models/question');

const quizController = {
  // Get all questions without correct answers
  getQuestions: (req, res) => {
    Question.getAll((err, questions) => {
      if (err) {
        return res.status(500).json({ 
          error: 'Failed to fetch questions',
          details: err.message 
        });
      }
      res.json(questions);
    });
  },

  // Submit answers and calculate score
  submitAnswers: (req, res) => {
    const { answers } = req.body;
    
    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ 
        error: 'Invalid answers format. Expected object with questionId: answer pairs' 
      });
    }

    Question.getAllWithAnswers((err, questions) => {
      if (err) {
        return res.status(500).json({ 
          error: 'Failed to fetch questions for validation',
          details: err.message 
        });
      }

      let score = 0;
      const results = [];

      questions.forEach(question => {
        const userAnswer = answers[question.id];
        const isCorrect = userAnswer === question.correct_option;
        
        if (isCorrect) {
          score++;
        }

        results.push({
          questionId: question.id,
          questionText: question.question_text,
          userAnswer,
          correctAnswer: question.correct_option,
          isCorrect,
          options: {
            A: question.option_a,
            B: question.option_b,
            C: question.option_c,
            D: question.option_d
          }
        });
      });

      res.json({
        score,
        total: questions.length,
        percentage: Math.round((score / questions.length) * 100),
        results
      });
    });
  },

  // Get quiz metadata (number of questions, etc.)
  getQuizInfo: (req, res) => {
    Question.getAll((err, questions) => {
      if (err) {
        return res.status(500).json({ 
          error: 'Failed to fetch quiz info',
          details: err.message 
        });
      }
      
      res.json({
        totalQuestions: questions.length,
        title: "General Knowledge Quiz"
      });
    });
  }
};

module.exports = quizController;