export type City = {
  id: number;
  name: string;
};

export enum CityActionTypes {
  FETCH_CITIES = "FETCH_CITIES",
  FETCH_CITIES_SUCCESS = "FETCH_CITIES_SUCCESS",
  FETCH_CITIES_ERROR = "FETCH_CITIES_ERROR",
  SET_CITIES_PAGE = "SET_CITIES_PAGE",
}

export interface CityState {
  cities: City[];
  loading: boolean;
  error: null | string;
  page: number;
  limit: number;
}

interface FetchCitiesAction {
  type: CityActionTypes.FETCH_CITIES;
}

interface FetchCitiesSuccessAction {
  type: CityActionTypes.FETCH_CITIES_SUCCESS;
  payload: City[];
}

interface FetchCitiesErrorAction {
  type: CityActionTypes.FETCH_CITIES_ERROR;
  payload: string;
}

interface SetCitiesPage {
  type: CityActionTypes.SET_CITIES_PAGE;
  payload: number;
}

export type CityAction =
  | FetchCitiesAction
  | FetchCitiesSuccessAction
  | FetchCitiesErrorAction
  | SetCitiesPage;
