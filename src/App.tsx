import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import PopUpDialog from "./components/PopUpDialog";
import TimeDisplay from "./components/TimeDisplay";
import "./styling/TimeDisplay.css";
import { DisplayType, ScheduleData, scheduleTest } from "./types";
import { convertToTimeZone, subtractBusyTimes } from "./utils";

function App() {
  // Component state
  const [scheduleData, setScheduleData] = useState<ScheduleData>(scheduleTest); 
  const [days, setDays] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [availableSlots, setAvailableSlots] = useState<
    { start: Date; end: Date }[]
  >([]);
  const [showNoSlotsDisclaimer, setShowNoSlotsDisclaimer] =
    useState<boolean>(false);

  const handleButtonClick = (day: string) => {
    setSelectedDay(day);
  };

  // Fetch the schedule data from the API and convert the date ranges to the user's time zone
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


  // Update the available slots when the selected day changes

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
      const available = slots.filter(
        (slot) => slot.start.getDate() === new Date(selectedDay).getDate()
      );
      setAvailableSlots(available);
      available.length === 0
        ? setShowNoSlotsDisclaimer(true)
        : setShowNoSlotsDisclaimer(false);
    }
  }, [selectedDay, scheduleData]);

  return (
    <div className="container">
      <PopUpDialog onViewClick={() => {}} />
      <h2 className="headerText">Haroon Iftikhar</h2>
      <div className="columnContainer">
        <ul className="column">
          <h2 className="headerText">Pick a Day</h2>
          {days?.map((item, index) => (
            <div key={index}>
              <div className="time-container" onClick={() => handleButtonClick(item)}>
                <p className="time">{item}</p>
              </div>
            </div>
          ))}
        </ul>
        <ul className="column">
          <h2 className="headerText">{selectedDay}</h2>
          {!showNoSlotsDisclaimer &&
            selectedDay &&
            availableSlots.map((item, index) => (
              <TimeDisplay
                key={index}
                start={item.start}
                type={DisplayType.time}
              />
            ))}
          {showNoSlotsDisclaimer && selectedDay && (
            <p className="footerText">No available slots for this day</p>
          )}
        </ul>
      </div>
      <p className="footerText">{scheduleData?.timeZone}</p>
    </div>
  );
}

export default App;
