export type Meeting = {
    start: string;
    end: string;
    title: string;
}

export type DateRange = {
    start: string;
    end: string;
}

export type WorkingHours = {
    days: number[];
    startTime: number;
    endTime: number;
    userId: number;
}

export type ScheduleData = {
    busy: Meeting[];
    timeZone: string;
    dateRanges: DateRange[];
    workingHours: WorkingHours[];
    dateOverrides: any[];
    currentSeats: number | null;
}

export const scheduleTest: ScheduleData = {
    busy: [
        {
            start: "2023-08-15T20:30:00.000Z",
            end: "2023-08-15T21:00:00.000Z",
            title: "30 Min Meeting between Haroon Iftikhar and Haroon Iftikhar"
        }
    ],
    timeZone: "America/Los_Angeles",
    dateRanges: [
        {
            start: "2023-08-15T16:00:00.000Z",
            end: "2023-08-15T20:30:00.000Z"
        },
        {
            start: "2023-08-15T21:00:00.000Z",
            end: "2023-08-16T00:00:00.000Z"
        },
        // ... other dateRanges ...
    ],
    workingHours: [
        {
            days: [1, 2, 3, 4, 5],
            startTime: 960,
            endTime: 1439,
            userId: 1
        }
    ],
    dateOverrides: [],
    currentSeats: null
};

export {}