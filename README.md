quiz-app
========

A simple full-stack quiz app that lets users take a timed quiz and see a detailed score breakdown. Built with React + Bootstrap on the frontend, and Node/Express + SQLite on the backend. Includes automated backend tests (Supertest).

Project Goals
-------------

*   Provide a single-quiz experience stored in SQLite
    
*   Serve question data without exposing correct answers to the client
    
*   Allow users to answer questions, submit answers to the backend, and see a results page with score and per-question correctness
    
*   Support a timer on the frontend and server-side scoring logic
    

Features
--------

### Backend

*   SQLite database storing questions with options and the correct option
    
*   REST API endpoints:
    
    *   GET /api/quiz/questions — returns all questions (no correct\_option field)
        
    *   POST /api/quiz/submit — accepts user answers, validates them, calculates score and per-question results
        
    *   GET /api/quiz/info — returns quiz metadata (title, totalQuestions)
        
*   Controller logic to compute score, total, percentage, and per-question results
    
*   Backend tests using Supertest to verify endpoints and scoring behavior
    

### Frontend

*   Start page showing quiz title, total questions and time limit
    
*   Quiz view shows one question at a time with options (A/B/C/D)
    
*   `Navigation controls:` Previous, Next
    
*   `Submit button` on final question to send answers to backend
    
*   Timer with visual warnings for low time and a timeout state
    
*   `Timeout handling:` user can proceed to results when time ends.(*go-to result page* button will be shown on timeout)
    
*   `Results view:
    
    *   Score summary (score, total, percentage)
        
    *   Per-question details: user answer, correct answer, and correctness.
        
    *   Encouraging performance badge
        

API Reference
-------------

### `GET /api/quiz/questions`
**Response** `200 OK` — array of questions (no `correct_option` field):
```json
[
  {
    "id": 1,
    "question_text": "What is the capital of France?",
    "option_a": "London",
    "option_b": "Berlin",
    "option_c": "Paris",
    "option_d": "Madrid"
  },
    ...
]
```

### `GET /api/quiz/questions`
```
{
  "answers": {
    "1": "C",
    "2": "D",
    "3": "B"
  }
}
```
#### Response 200 OK
```
{
  "score": 3,
  "total": 5,
  "percentage": 60,
  "results": [
    {
      "questionId": 1,
      "questionText": "What is the capital of France?",
      "userAnswer": "C",
      "correctAnswer": "C",
      "isCorrect": true,
      "options": { "A": "...", "B": "...", "C": "...", "D": "..." }
    },
    ...
  ]
}
```

## Local setup
### Prerequisites :
* Node.js (v16+ recommended)
* npm
* (Optional) SQLite client for browsing the db.sqlite file.

## `Install & run`
```
# Backend
cd backend
npm install
npm run dev

# Frontend (in new terminal)
cd frontend
npm install
npm run dev
```
The backend uses a local SQLite file (db.sqlite) and will insert sample questions automatically on first run.

## Tests
Run backend tests (Supertest-based):
```
npm test
```
#### Included tests:
* `GET /api/quiz/questions` returns an array without correct_option.
* `POST /api/quiz/submit` returns score, results, and expected structure.
* `GET /api/quiz/info` returns quiz metadata.


---

# Project Structure
```
quiz-app/
├── backend/
│   ├── controllers/
│   │   └── quizController.js
│   ├── models/
│   │   └── question.js
│   ├── routes/
│   │   └── quizRoutes.js
│   ├── config/
│   │   └── database.js
│   ├── tests/
│   │   └── quiz.test.js
│   └── server.js
└── frontend/
    └── src/
        ├── App.jsx
        ├── components/
        │   ├── StartPage.jsx
        │   ├── QuizPage.jsx
        │   ├── Question.jsx
        │   ├── ResultPage.jsx
        │   └── Timer.jsx
        └── App.css

```

## How to Set-up

