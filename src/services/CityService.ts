import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ICity } from "../Models/City";

export const cityAPI = createApi({
  reducerPath: "cityAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes: ["City"],
  endpoints: (build) => ({
    fetchAllCities: build.query<
      ICity[],
      { page: number; limit: number } | void
    >({
      query: (queryParams) => ({
        url: "/cities",
        params: {
          ...queryParams,
        },
      }),
      providesTags: (result) => ["City"],
    }),
    createCity: build.mutation({
      query: (city) => ({
        url: "/cities",
        method: "POST",
        body: city,
      }),
      invalidatesTags: ["City"],
    }),
    updateCity: build.mutation({
      query: (city) => ({
        url: `/cities/${city.id}`,
        method: "PUT",
        body: city,
      }),
      invalidatesTags: ["City"],
    }),
    deleteCity: build.mutation({
      query: (city) => ({
        url: `/cities/${city.id}`,
        method: "DELETE",
        body: city,
      }),
      invalidatesTags: ["City"],
    }),
  }),
});
