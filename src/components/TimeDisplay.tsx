import React from 'react';
import "../styling/TimeDisplay.css";

interface TimeDisplayProps {
  start: Date;
  end: Date;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ start, end }) => {


  const dateObject = new Date(start);

  const handleSlotClick = () => {
    console.log("clicked");
    alert("Appointment booked!");
  };

  // Formatting options
  const options = {
    hour: "2-digit" as const,
    minute: "2-digit" as const,
    hour12: true
  };
  
  const formattedTime = dateObject.toLocaleTimeString('en-US', options);

  return (
    <div className="time-container" onClick={handleSlotClick}>
      <p className="time">{formattedTime}</p>
    </div>
  );
};

export default TimeDisplay;
