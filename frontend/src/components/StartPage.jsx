import React from 'react';

const StartPage = ({ onStart, loading, quizInfo }) => {
  const quizTimeLimit = 300; // 5 minutes
  const minutes = Math.floor(quizTimeLimit / 60);

  return (
    <div className="text-center">
      <h1 className="display-5 mb-4">📚 Knowledge Quiz</h1>
      <p className="lead mb-4">
        Test your knowledge with this interactive quiz. 
        Answer all questions and see how well you score!
      </p>
      
      {quizInfo && (
        <div className="quiz-info mb-4 p-3 bg-light rounded">
          <p className="mb-1"><strong>Quiz:</strong> {quizInfo.title}</p>
          <p className="mb-1"><strong>Total Questions:</strong> {quizInfo.totalQuestions}</p>
          <p className="mb-0"><strong>Time Limit:</strong> ⏱️ {minutes} minutes</p>
        </div>
      )}

      <div className="instructions mb-4 text-start">
        <h6>Instructions:</h6>
        <ul className="list-unstyled small">
          <li>• Read each question carefully</li>
          <li>• Select one answer for each question</li>
          <li>• Use Next/Previous to navigate</li>
          <li>• Submit when you've answered all questions</li>
          <li>• <strong>Time limit: {minutes} minutes</strong></li>
        </ul>
      </div>

      <button 
        className="btn btn-primary btn-lg px-5"
        onClick={onStart}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
            Loading...
          </>
        ) : (
          'Start Quiz'
        )}
      </button>
    </div>
  );
};

export default StartPage;