import { createAsyncThunk } from "@reduxjs/toolkit";
import { getWindInfo } from "../../http/weatherAPI";
import { WindRoseDirectionInfo } from "../../Models/WindRoseDirection";

export const fetchWindInfo = createAsyncThunk<
  WindRoseDirectionInfo[],
  { city: string; startDate: Date; endDate: Date }
>("weather/fetchAll", async ({ city, startDate, endDate }, thunkAPI) => {
  try {
    const response = await getWindInfo(city, startDate, endDate);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue("Ошибка загрузки данных о ветре");
  }
});
