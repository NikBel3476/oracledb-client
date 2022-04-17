import moment from "moment";
import { $weather } from "./index";
import { WindRoseDirectionInfo } from "../Models/WindRoseDirection";

const getWindInfo = async (city: string, start: Date, end: Date) => {
  const startDateISO = moment(start).format("yyyy-MM-DDTHH:mm");
  const endDateISO = moment(end).format("yyyy-MM-DDTHH:mm");
  const data = await $weather.get<WindRoseDirectionInfo[]>(
    `${city}/${startDateISO}/${endDateISO}`
  );
  return data;
};

export { getWindInfo };
