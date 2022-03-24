import { CityAction, CityActionTypes, CityState } from "../../types/City";

const initialState: CityState = {
  cities: [],
  loading: false,
  error: null,
  page: 1,
  limit: 10,
};

export const cityReducer = (
  state = initialState,
  action: CityAction
): CityState => {
  switch (action.type) {
    case CityActionTypes.FETCH_CITIES:
      return { ...state, loading: true };
    case CityActionTypes.FETCH_CITIES_SUCCESS:
      return { ...state, loading: false, cities: action.payload };
    case CityActionTypes.FETCH_CITIES_ERROR:
      return { ...state, loading: false, error: action.payload };
    case CityActionTypes.SET_CITIES_PAGE:
      return { ...state, page: action.payload };
    default:
      return state;
  }
};
