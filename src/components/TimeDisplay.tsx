import React from 'react';
import { dateOptions, timeOptions } from '../constants';
import "../styling/TimeDisplay.css";
import { DisplayType } from '../types';

interface TimeDisplayProps {
  start: Date;
  type: DisplayType;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ start, type }) => {

  const options = timeOptions;
  const dateObject = new Date(start);

  const handleSlotClick = () => {
    console.log("clicked");
    alert("Appointment booked!");
  };
  
  const formattedTime = dateObject.toLocaleTimeString('en-US', options);

  return (
    <div className="time-container" onClick={handleSlotClick}>
      <p className="time">{formattedTime}</p>
    </div>
  );
};

export default TimeDisplay;
