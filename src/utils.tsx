import { ScheduleData } from "./types";

export const convertToTimeZone = (date: Date, timeZone: string) => {
  const dateWithTimeZone = new Date(
    date.toLocaleString("en-US", { timeZone })
  );
  return dateWithTimeZone.toString();
}

export const subtractBusyTimes = (data: ScheduleData) => {
  const remainingSlots = [];

  for (const dateRange of data.dateRanges) {
    const startDate = new Date(dateRange.start);
    const endDate = new Date(dateRange.end);

    // Calculate available slots within the date range
    let currentTime = new Date(startDate); // Initialize currentTime within the loop
    while (currentTime < endDate) {
      // Check if the slot time is in the future
      const now = new Date();
      if (currentTime >= now) {
        const endTime = new Date(currentTime);
        endTime.setMinutes(endTime.getMinutes() + 15);

        const isSlotAvailable = data.busy.every((busyTime) => {
          const busyStart = new Date(busyTime.start);
          const busyEnd = new Date(busyTime.end);
          return currentTime >= busyEnd || endTime <= busyStart;
        });

        if (isSlotAvailable) {
          remainingSlots.push({
            start: new Date(currentTime), // Convert to Date object
            end: new Date(endTime), // Convert to Date object
          });
        }
      }

      currentTime.setMinutes(currentTime.getMinutes() + 15);
    }
  }

  console.log(remainingSlots);
  return remainingSlots;
};

