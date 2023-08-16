import axios from "axios";
import { BookingRequest } from "../types";
import { apiKey } from "./../constants";

const url = `http://localhost:3002/v1/bookings?apiKey=${apiKey}`;

const requestBody = {
  value: {
    eventTypeId: 1,
    start: "2023-05-21T13:00:00.000Z",
    responses: {
      name: "Hello Hello",
      email: "hello@gmail.com",
      metadata: {},
      location: "Calcom HQ",
    },
    timeZone: "Europe/London",
    language: "en",
  },
};

axios
  .post(url, requestBody)
  .then((response) => {
    console.log("Response:", response.data);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });

// write a function to make the post request for a booking
const makePostRequest = async (time: Date, body: BookingRequest) => {
  try {
    const response = await axios.post(url, body);
    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error fetching schedule data:", error);
  }
};
