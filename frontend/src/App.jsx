import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import StartPage from './components/StartPage';
import QuizPage from './components/QuizPage';
import ResultPage from './components/ResultPage';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('start');
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizResults, setQuizResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quizInfo, setQuizInfo] = useState(null);

  useEffect(() => {
    fetchQuizInfo();
  }, []);

  const fetchQuizInfo = async () => {
    try {
      const response = await fetch('/api/quiz/info');
      const data = await response.json();
      setQuizInfo(data);
    } catch (error) {
      console.error('Error fetching quiz info:', error);
    }
  };

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/quiz/questions');
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
    setLoading(false);
  };

  const handleStartQuiz = () => {
    setUserAnswers({});
    setQuizResults(null);
    fetchQuestions();
    setCurrentView('quiz');
  };

  const handleAnswerSelect = (questionId, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  // Updated handleSubmitQuiz to handle timeout submissions
  const handleSubmitQuiz = async (manualResults = null, isTimeout = false) => {
    setLoading(true);
    try {
      let results;
      if (manualResults) {
        // Use the manually provided results
        results = manualResults;
      } else {
        // Normal submission to backend
        const response = await fetch('/api/quiz/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ answers: userAnswers }),
        });
        results = await response.json();
        // Add timeout flag if this is a timeout submission
        if (isTimeout) {
          results.isTimeout = true;
        }
      }
      setQuizResults(results);
      setCurrentView('results');
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
    setLoading(false);
  };

  const handleRestart = () => {
    setCurrentView('start');
    setUserAnswers({});
    setQuizResults(null);
  };

  return (
    <div className="app-container">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow">
              <div className="card-body p-4">
                {currentView === 'start' && (
                  <StartPage 
                    onStart={handleStartQuiz} 
                    loading={loading}
                    quizInfo={quizInfo}
                  />
                )}
                
                {currentView === 'quiz' && (
                  <QuizPage
                    questions={questions}
                    userAnswers={userAnswers}
                    onAnswerSelect={handleAnswerSelect}
                    onSubmit={handleSubmitQuiz}
                    loading={loading}
                  />
                )}
                
                {currentView === 'results' && quizResults && (
                  <ResultPage
                    results={quizResults}
                    questions={questions}
                    onRestart={handleRestart}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;