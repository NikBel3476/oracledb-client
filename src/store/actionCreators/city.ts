import { Dispatch } from "redux";
import { City, CityAction, CityActionTypes } from "../../types/City";
import { $city } from "../../http";

export const fetchCities = (page = 1, limit = 10) => {
  return async (dispatch: Dispatch<CityAction>) => {
    try {
      dispatch({ type: CityActionTypes.FETCH_CITIES });
      const response = await $city.get<City[]>("/", {
        params: {
          page,
          limit,
        },
      });
      dispatch({
        type: CityActionTypes.FETCH_CITIES_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: CityActionTypes.FETCH_CITIES_ERROR,
        payload: "Возникла ошибка при загрузке городов",
      });
    }
  };
};

export const setCitiesPage = (page: number) => {
  return { type: CityActionTypes.SET_CITIES_PAGE, payload: page };
};
