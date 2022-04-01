import { $weather } from "./index";
import { IWindInfo } from "../Models/IWindInfo";

const getWindInfo = async (city: string, start: Date, end: Date) => {
  const startISO = start.toISOString().split("T")[0];
  const endISO = end.toISOString().split("T")[0];
  const data = await $weather.get<{ days: IWindInfo[] }>(
    `${city}/${startISO}/${endISO}`
  );
  return data;
};

export { getWindInfo };
