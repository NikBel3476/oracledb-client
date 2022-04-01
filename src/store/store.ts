import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cityAPI } from "./API/CityAPI";
import windInfoReducer from "./reducers/WindInfoSlice";

const rootReducer = combineReducers({
  windInfoReducer,
  [cityAPI.reducerPath]: cityAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cityAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
