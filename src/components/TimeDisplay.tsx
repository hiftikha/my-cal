import React from 'react';
import { dateOptions, timeOptions } from '../constants';
import "../styling/TimeDisplay.css";
import { DisplayType } from '../types';
import { bookSlotRequest } from '../api/postBooking';

interface TimeDisplayProps {
  start: Date;
  type: DisplayType;
  setNewAppointment: (value: boolean) => void;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ start, type, setNewAppointment }) => {

  console.log("start:", start.toISOString());
  const options = timeOptions;
  const dateObject = new Date(start);

  const handleSlotClick = () => {
    bookSlotRequest(start.toISOString())
    .then((response) => {
      setNewAppointment(true);
      alert("Appointment booked!");
    })
  };
  
  const formattedTime = dateObject.toLocaleTimeString('en-US', options);

  return (
    <div className="time-container" onClick={handleSlotClick}>
      <p className="time">{formattedTime}</p>
    </div>
  );
};

export default TimeDisplay;
