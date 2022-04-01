import axios from "axios";

export const $weather = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/weather/timeline`,
  timeout: 5000,
});

export const $city = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/cities`,
  timeout: 5000,
});
