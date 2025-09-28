// In Timer.jsx, enhance the warning states:
import React from 'react';

const Timer = ({ timeRemaining }) => {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const isWarning = timeRemaining < 60;
  const isCritical = timeRemaining < 30;

  return (
    <div className={`timer ${isCritical ? 'text-danger pulse' : isWarning ? 'text-warning' : 'text-dark'}`}>
      <i className={`bi bi-clock me-2 ${isCritical ? 'pulse' : ''}`}></i>
      <strong>Time: </strong>
      {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      {isCritical && <span className="ms-2">⚠️</span>}
    </div>
  );
};

export default Timer;