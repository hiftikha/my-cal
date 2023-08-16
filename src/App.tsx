import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import TimeDisplay from "./TimeDisplay";
import { Meeting, ScheduleData, scheduleTest } from "./types";
import { convertToTimeZone, subtractBusyTimes } from "./utils";

function App() {
  // Component state
  const [scheduleData, setScheduleData] = useState<ScheduleData>(scheduleTest);
  const [days, setDays] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [availableSlots, setAvailableSlots] = useState<
    { start: Date; end: Date }[]
  >([]);

  const bookSlot = () => {};

  const handleButtonClick = (day: string) => {
    setSelectedDay(day);
  };

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/v1/availability?apiKey=cal_e2b15312ac83d3e652dc6b3c57b44c73&username=hiftikha&dateFrom=2023-08-15&dateTo=2023-08-25"
        );

        const responseData: ScheduleData = response.data;
        const timeZone = responseData.timeZone;

        const convertedBusyTimes = responseData.busy.map((busyTime) => {
          return {
            ...busyTime,
            start: convertToTimeZone(new Date(busyTime.start), timeZone),
            end: convertToTimeZone(new Date(busyTime.end), timeZone),
          };
        });


        const convertedDateRanges = responseData.dateRanges.map((dateRange) => {
          return {
            start: convertToTimeZone(new Date(dateRange.start), timeZone),
            end: convertToTimeZone(new Date(dateRange.end), timeZone),
          };
        });

        // Update the schedule data with the converted date ranges
        const updatedScheduleData = {
          ...responseData,
          dateRanges: convertedDateRanges,
          busy: convertedBusyTimes,
        };
        setScheduleData(updatedScheduleData);
      } catch (error) {
        console.error("Error fetching schedule data:", error);
      }
    };

    fetchScheduleData();
  }, []);

  useEffect(() => {
    const uniqueFormattedDates = new Set<string>();

    scheduleData?.dateRanges.map((dateRange, index) => {
      const startDate = new Date(dateRange.start);
      const formattedDate = startDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      if (!uniqueFormattedDates.has(formattedDate)) {
        uniqueFormattedDates.add(formattedDate);
      }
    });

    const daysArray: string[] = Array.from(uniqueFormattedDates);
    setDays(daysArray);

    if (scheduleData) {
      const slots = subtractBusyTimes(scheduleData);
      setAvailableSlots(slots.filter((slot) => slot.start.getDate() === new Date(selectedDay).getDate()));
    }
  }, [selectedDay, scheduleData]);

  return (
    <div className="container">
      <h2 className="headerText">Haroon Iftikhar</h2>
      <div className="columnContainer">
        <ul className="column">
          <h2 className="headerText">Pick a Day</h2>
          {days?.map((item, index) => (
            <div key={index}>
              <button
                className="button"
                onClick={() => handleButtonClick(item)}
              >
                {item}
              </button>
            </div>
          ))}
        </ul>
        <ul className="column">
          <h2 className="headerText">{selectedDay}</h2>
          {availableSlots.map((item, index) => (
            <TimeDisplay key={index} start={item.start} end={item.end} />
          ))}
        </ul>
      </div>
      <p className="footerText">{scheduleData?.timeZone}</p>
    </div>
  );
}

export default App;
