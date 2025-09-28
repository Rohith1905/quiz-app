import React from 'react';

const Question = ({ question, selectedAnswer, onAnswerSelect }) => {
  if (!question) return null;

  const options = [
    { key: 'A', value: question.option_a },
    { key: 'B', value: question.option_b },
    { key: 'C', value: question.option_c },
    { key: 'D', value: question.option_d }
  ];

  return (
    <div className="question-container">
      <h5 className="mb-4">{question.question_text}</h5>
      <div className="options-list">
        {options.map(option => (
          <div key={option.key} className="option-item mb-3">
            <button
              className={`btn w-100 text-start p-3 ${
                selectedAnswer === option.key 
                  ? 'btn-primary' 
                  : 'btn-outline-primary'
              }`}
              onClick={() => onAnswerSelect(option.key)}
            >
              <span className="option-key me-3">{option.key}.</span>
              {option.value}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;