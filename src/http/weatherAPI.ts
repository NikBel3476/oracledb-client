import { $weather } from "./index";

const getWindStats = async (city: string, start: Date, end: Date) => {
  const startISO = start.toISOString().split("T")[0];
  const endISO = end.toISOString().split("T")[0];
  const data = await $weather.get(`${city}/${startISO}/${endISO}`);
  return data;
};

export { getWindStats };
