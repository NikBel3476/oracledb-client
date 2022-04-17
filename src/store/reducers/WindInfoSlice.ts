import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchWindInfo } from "../ActionCreators/WindInfo";
import { WindRoseDirectionInfo } from "../../Models/WindRoseDirection";

interface WindInfoState {
  windRoseDirections: WindRoseDirectionInfo[];
  isLoading: boolean;
  error: string;
}

const initialState: WindInfoState = {
  windRoseDirections: [],
  isLoading: false,
  error: "",
};

export const windInfoSlice = createSlice({
  name: "windInfo",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchWindInfo.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchWindInfo.fulfilled.type]: (
      state,
      action: PayloadAction<WindRoseDirectionInfo[]>
    ) => {
      state.windRoseDirections = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    [fetchWindInfo.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default windInfoSlice.reducer;
