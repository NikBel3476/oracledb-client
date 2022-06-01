import moment from "moment";
import { $weather } from "./index";
import { WindRoseDirectionInfo } from "../Models/WindRoseDirection";

const getWindInfo = async (city: string, startDate: Date, endDate: Date) => {
	const startDateString = moment(startDate).format("yyyy-MM-DD");
	const endDateString = moment(endDate).format("yyyy-MM-DD");
	return await $weather.get<{
		windRoseStats: WindRoseDirectionInfo[];
		startDate?: string;
		endDate?: string;
		errors: string[];
	}>(`${city}/${startDateString}/${endDateString}`);
};

export { getWindInfo };
