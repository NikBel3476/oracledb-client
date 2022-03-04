import { $weather } from "./index";

const getWindStats = async (start: Date, end: Date) => {
  const startISO = start.toISOString().split("T")[0];
  const endISO = end.toISOString().split("T")[0];
  const data = await $weather.get(`Izhevsk/${startISO}/${endISO}`); // TODO: delete Izhevsk from URL
  return data;
};

export { getWindStats };
