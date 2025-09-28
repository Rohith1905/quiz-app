const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'db.sqlite');
const db = new sqlite3.Database(dbPath);

const initializeDatabase = () => {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question_text TEXT NOT NULL,
      option_a TEXT NOT NULL,
      option_b TEXT NOT NULL,
      option_c TEXT NOT NULL,
      option_d TEXT NOT NULL,
      correct_option CHAR(1) NOT NULL
    )`);

    // Check if questions already exist
    db.get("SELECT COUNT(*) as count FROM questions", (err, row) => {
      if (err) {
        console.error('Error checking questions:', err);
        return;
      }

      if (row.count === 0) {
        // Insert sample questions only if table is empty
        const stmt = db.prepare(`INSERT INTO questions 
          (question_text, option_a, option_b, option_c, option_d, correct_option) 
          VALUES (?, ?, ?, ?, ?, ?)`);
        
        const sampleQuestions = [
          {
            text: "What is the capital of France?",
            options: ["London", "Berlin", "Paris", "Madrid"],
            correct: "C"
          },
          {
            text: "Which language runs in a web browser?",
            options: ["Java", "C", "Python", "JavaScript"],
            correct: "D"
          },
          {
            text: "What does CSS stand for?",
            options: [
              "Central Style Sheets",
              "Cascading Style Sheets",
              "Cascading Simple Sheets",
              "Cars SUVs Sailboats"
            ],
            correct: "B"
          },
          {
            text: "Which of these is a JavaScript framework?",
            options: ["Django", "Flask", "React", "Laravel"],
            correct: "C"
          },
          {
            text: "What year was JavaScript launched?",
            options: ["1996", "1995", "1994", "None of the above"],
            correct: "B"
          }
        ];

        sampleQuestions.forEach(q => {
          stmt.run(q.text, q.options[0], q.options[1], q.options[2], q.options[3], q.correct);
        });

        stmt.finalize();
        console.log('Sample questions inserted');
      }
    });
  });
};

module.exports = { db, initializeDatabase };