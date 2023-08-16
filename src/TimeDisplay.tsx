import React from 'react';
import "./TimeDisplay.css";

interface TimeDisplayProps {
  start: Date;
  end: Date;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ start, end }) => {


  const dateObject = new Date(start);

  // Formatting options
  const options = {
    hour: "2-digit" as const,
    minute: "2-digit" as const,
    hour12: true
  };
  
  const formattedTime = dateObject.toLocaleTimeString('en-US', options);

  return (
    <div className="time-container">
      <p className="time">{formattedTime}</p>
    </div>
  );
};

export default TimeDisplay;
