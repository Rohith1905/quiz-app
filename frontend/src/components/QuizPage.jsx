import React, { useState, useEffect } from 'react';
import Question from './Question';
import Timer from './Timer';

const QuizPage = ({ questions, userAnswers, onAnswerSelect, onSubmit, loading }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(10); // 5 minutes
  const [isTimeout, setIsTimeout] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const allQuestionsAnswered = questions.length === Object.keys(userAnswers).length;

  useEffect(() => {
    if (timeRemaining === 0 && !isTimeout) {
      handleTimeout();
    }
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, isTimeout]);

  const handleTimeout = () => {
    setIsTimeout(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1 && !isTimeout) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0 && !isTimeout) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleQuestionNav = (index) => {
    if (!isTimeout) {
      setCurrentQuestionIndex(index);
    }
  };

  const handleGoToResults = () => {
    // For timeout scenario, we still need to submit to backend for proper evaluation
    // Pass a flag to indicate this is a timeout submission
    onSubmit(null, true); // First param null for normal backend call, second param for timeout flag
  };

  if (questions.length === 0) {
    return (
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading questions...</span>
        </div>
        <p className="mt-2">Loading questions...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header with progress and timer */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <div>
          <h5 className="mb-0">Question {currentQuestionIndex + 1} of {questions.length}</h5>
        </div>
        <Timer timeRemaining={timeRemaining} />
      </div>

      {/* Timeout overlay */}
      {isTimeout 
    //   && (
    //     <div className="timeout-overlay position-absolute top-0 start-0 w-100 h-100 bg-warning bg-opacity-10 d-flex align-items-center justify-content-center rounded">
    //       <div className="alert alert-warning text-center w-75">
    //         <h4 className="alert-heading">⏰ Time's Up!</h4>
    //         <p className="mb-3">The quiz time has ended. You can review your answers and proceed to results.</p>
    //       </div>
    //     </div>
    //   )
      }

      {/* Timeout warning */}
      {timeRemaining <= 60 && timeRemaining > 0 && !isTimeout && (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>⏰ Time Warning!</strong> Only {timeRemaining} second{timeRemaining !== 1 ? 's' : ''} remaining!
          <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
        </div>
      )}

      {/* Question navigation dots */}
      <div className="question-dots mb-4">
        {questions.map((_, index) => (
          <button
            key={index}
            className={`dot me-2 ${index === currentQuestionIndex ? 'active' : ''} ${
              userAnswers[questions[index].id] ? 'answered' : ''
            } ${isTimeout ? 'disabled' : ''}`}
            onClick={() => handleQuestionNav(index)}
            disabled={isTimeout}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Current question */}
      <div className={isTimeout ? 'opacity-75' : ''}>
        <Question
          question={currentQuestion}
          selectedAnswer={userAnswers[currentQuestion.id]}
          onAnswerSelect={(answer) => !isTimeout && onAnswerSelect(currentQuestion.id, answer)}
          disabled={isTimeout}
        />
      </div>

      {/* Navigation buttons and Go to Results button */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <button
          className="btn btn-outline-secondary"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          ← Previous
        </button>

        {/* Go to Results Button - Only show after timeout */}
        {isTimeout && (
          <button
            className="btn btn-warning"
            onClick={handleGoToResults}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Processing...
              </>
            ) : (
              '⏰ Go to Result Page'
            )}
          </button>
        )}

        {isLastQuestion ? (
          <button
            className="btn btn-success px-4"
            onClick={() => onSubmit()}
            disabled={!allQuestionsAnswered || loading || isTimeout}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Submitting...
              </>
            ) : (
              'Submit Quiz'
            )}
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={handleNext}
          >
            Next →
          </button>
        )}
      </div>

      {/* Progress bar */}
      <div className="progress mt-4" style={{ height: '8px' }}>
        <div
          className="progress-bar"
          style={{
            width: `${(Object.keys(userAnswers).length / questions.length) * 100}%`
          }}
        ></div>
      </div>
      <div className="text-center small text-muted mt-2">
        {Object.keys(userAnswers).length} of {questions.length} questions answered
      </div>
    </div>
  );
};

export default QuizPage;