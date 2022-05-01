import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ICity } from "../../Models/ICity";
import { CONFIG } from "../../http/config";

export const cityAPI = createApi({
  reducerPath: "cityAPI",
  baseQuery: fetchBaseQuery({ baseUrl: `${CONFIG.API_URL}/api` }),
  tagTypes: ["City"],
  endpoints: (build) => ({
    getCities: build.query<ICity[], { page: number; limit: number } | void>({
      query: (queryParams) => ({
        url: "/cities",
        params: {
          ...queryParams,
        },
      }),
      providesTags: (result) => ["City"],
    }),
    createCity: build.mutation<ICity, string>({
      query: (cityName) => ({
        url: "/cities",
        method: "POST",
        body: { name: cityName },
      }),
      invalidatesTags: ["City"],
    }),
    updateCity: build.mutation<ICity, ICity>({
      query: (city) => ({
        url: `/cities/${city.id}`,
        method: "PUT",
        body: city,
      }),
      invalidatesTags: ["City"],
    }),
    deleteCity: build.mutation<ICity, number>({
      query: (cityId) => ({
        url: `/cities/${cityId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["City"],
    }),
  }),
});

export const {
  useGetCitiesQuery,
  useCreateCityMutation,
  useDeleteCityMutation,
  useUpdateCityMutation,
} = cityAPI;
