const { db } = require('../config/database');

class Question {
  static getAll(callback) {
    const sql = `SELECT id, question_text, option_a, option_b, option_c, option_d 
                 FROM questions`;
    db.all(sql, [], callback);
  }

  static getAllWithAnswers(callback) {
    const sql = `SELECT id, question_text, option_a, option_b, option_c, option_d, correct_option 
                 FROM questions`;
    db.all(sql, [], callback);
  }

  static getById(id, callback) {
    const sql = `SELECT * FROM questions WHERE id = ?`;
    db.get(sql, [id], callback);
  }

  static validateAnswer(questionId, userAnswer, callback) {
    const sql = `SELECT correct_option FROM questions WHERE id = ?`;
    db.get(sql, [questionId], (err, row) => {
      if (err) {
        return callback(err);
      }
      if (!row) {
        return callback(new Error('Question not found'));
      }
      callback(null, userAnswer === row.correct_option);
    });
  }
}

module.exports = Question;