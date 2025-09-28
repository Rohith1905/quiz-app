import React from 'react';

const ResultPage = ({ results, questions, onRestart }) => {
  const getOptionText = (question, optionKey) => {
    const options = {
      'A': question.option_a,
      'B': question.option_b,
      'C': question.option_c,
      'D': question.option_d
    };
    return options[optionKey];
  };

  const getAnswerClass = (isCorrect) => {
    return isCorrect ? 'text-success' : 'text-danger';
  };

  const getResultIcon = (isCorrect) => {
    return isCorrect ? '✅' : '❌';
  };

  return (
    <div className="results-container">
      {/* Timeout Message */}
      {results.isTimeout 
      && (
        <div className="alert alert-warning text-center mb-4">
          <h4 className="alert-heading">⏰ Time's Up!</h4>
          <p className="mb-0">
            The quiz time ended. You reviewed your answers and proceeded to see your results.
          </p>
        </div>
      )
      }

      {/* Score Summary */}
      <div className="text-center mb-5">
        <h2 className="display-6 mb-3">
          Quiz Completed! {results.isTimeout ? '⏰' : '🎉'}
        </h2>
        <div
          className={`score-display ${
            results.percentage >= 80
              ? 'text-success'
              : results.percentage >= 60
              ? 'text-warning'
              : 'text-danger'
          }`}
        >
          <h3 className="mb-1">{results.score} / {results.total}</h3>
          <h4 className="mb-3">{results.percentage}%</h4>
          <div className="performance-badge">
            {results.percentage >= 80
              ? 'Excellent! 🌟'
              : results.percentage >= 60
              ? 'Good Job! 👍'
              : 'Keep Practicing! 💪'}
          </div>
        </div>
      </div>

      {/* Detailed Results */}
      <div className="detailed-results">
        <h5 className="mb-4 border-bottom pb-2">Detailed Results:</h5>
        {results.results.map((result, index) => {
          const question = questions.find(q => q.id === result.questionId);
          return (
            <div
              key={result.questionId}
              className={`result-item mb-4 p-3 border rounded ${
                result.isCorrect ? 'border-success' : 'border-danger'
              }`}
            >
              <div className="d-flex align-items-start mb-2">
                <span className="me-2">{getResultIcon(result.isCorrect)}</span>
                <h6 className="mb-0">Question {index + 1}</h6>
              </div>
              <p className="mb-3">
                <strong>{question.question_text}</strong>
              </p>

              <div className="row">
                <div className="col-md-6">
                  <p className="mb-2">
                    <span className="text-muted">Your answer:</span><br />
                    <span className={getAnswerClass(result.isCorrect)}>
                      <strong>
                        {result.userAnswer}. {getOptionText(question, result.userAnswer)}
                      </strong>
                    </span>
                  </p>
                </div>
                <div className="col-md-6">
                  <p className="mb-2">
                    <span className="text-muted">Correct answer:</span><br />
                    <strong>
                      {result.correctAnswer}. {getOptionText(question, result.correctAnswer)}
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Restart Button */}
      <div className="text-center mt-4">
        <button className="btn btn-primary px-5" onClick={onRestart}>
          Take Quiz Again
        </button>
      </div>
    </div>
  );
};

export default ResultPage;