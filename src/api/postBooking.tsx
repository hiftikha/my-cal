import axios from "axios";
import { BookingRequest } from "../types";
import { apiKey } from "./../constants";

const url = `http://localhost:3002/v1/bookings?apiKey=${apiKey}`;

const requestBody = {
    eventTypeId: 1,
    start: "2023-05-21T13:00:00.000Z",
    username: "hiftikha",
    responses: {
      name: "Hello Hello",
      email: "hello@gmail.com",
    },
    metadata: {},
    timeZone: "America/Los_Angeles",
    language: "en",
};

export const bookSlotRequest = async (isoStartTime: string, body: BookingRequest = requestBody) => {
  try {
    const response = await axios.post(url, {
      ...body,
      start: isoStartTime,
    });
    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error fetching schedule data:", error);
  }
};
