const request = require('supertest');
const app = require('../server');
const { db } = require('../config/database');

describe('Quiz API', () => {
  beforeAll((done) => {
    // Wait for database to initialize
    setTimeout(done, 1000);
  });

  afterAll((done) => {
    db.close(done);
  });

  describe('GET /api/quiz/questions', () => {
    test('should return all questions without correct answers', async () => {
      const response = await request(app).get('/api/quiz/questions');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      
      // Check that correct answers are not included
      response.body.forEach(question => {
        expect(question.correct_option).toBeUndefined();
        expect(question.question_text).toBeDefined();
        expect(question.option_a).toBeDefined();
      });
    });
  });

  describe('POST /api/quiz/submit', () => {
    test('should calculate score for submitted answers', async () => {
      // First get questions to build answers object
      const questionsResponse = await request(app).get('/api/quiz/questions');
      const questions = questionsResponse.body;
      
      // Create answers object with all 'A' answers
      const answers = {};
      questions.forEach(question => {
        answers[question.id] = 'A';
      });

      const response = await request(app)
        .post('/api/quiz/submit')
        .send({ answers });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('score');
      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('percentage');
      expect(response.body).toHaveProperty('results');
      expect(Array.isArray(response.body.results)).toBe(true);
      expect(response.body.results.length).toBe(questions.length);
    });

    test('should return 400 for invalid answers format', async () => {
      const response = await request(app)
        .post('/api/quiz/submit')
        .send({ answers: 'invalid' });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/quiz/info', () => {
    test('should return quiz metadata', async () => {
      const response = await request(app).get('/api/quiz/info');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('totalQuestions');
      expect(response.body).toHaveProperty('title');
      expect(typeof response.body.totalQuestions).toBe('number');
    });
  });
});