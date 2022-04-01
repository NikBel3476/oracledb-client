import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWindInfo } from "../../Models/IWindInfo";
import { fetchWindInfo } from "../ActionCreators/WindInfo";

interface WindInfoState {
  days: IWindInfo[];
  isLoading: boolean;
  error: string;
}

const initialState: WindInfoState = {
  days: [],
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
      action: PayloadAction<IWindInfo[]>
    ) => {
      state.days = action.payload;
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
