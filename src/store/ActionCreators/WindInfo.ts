import { createAsyncThunk } from "@reduxjs/toolkit";
import { IWindInfo } from "../../Models/IWindInfo";
import { getWindInfo } from "../../http/weatherAPI";

export const fetchWindInfo = createAsyncThunk<
  IWindInfo[],
  { city: string; startDate: Date; endDate: Date }
>("weather/fetchAll", async ({ city, startDate, endDate }, thunkAPI) => {
  try {
    const response = await getWindInfo(city, startDate, endDate);
    return response.data.days;
  } catch (e) {
    return thunkAPI.rejectWithValue("Ошибка загрузки данных о ветре");
  }
});
