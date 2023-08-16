export const apiKey = "cal_e2b15312ac83d3e652dc6b3c57b44c73";

export const timeOptions = {
  hour: "2-digit" as const,
  minute: "2-digit" as const,
  hour12: true,
};

export const dateOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};

const today = new Date();
export const from = today
  .toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
  .split("/")
  .join("-");


const tenDaysFromToday = new Date(today.setDate(today.getDate() + 10));
export const until = tenDaysFromToday
  .toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
  .split("/")
  .join("-");