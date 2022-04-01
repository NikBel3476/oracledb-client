import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { CONFIG } from "../../http/config";

const weatherAPI = createApi({
  reducerPath: "windAPI",
  baseQuery: fetchBaseQuery({ baseUrl: `${CONFIG.API_URL}/api/weather` }),
  tagTypes: ["Wind"],
  endpoints: (build) => ({
    fetchWindInfo: build.query<any, { startDate: Date; endDate: Date }>({
      query: ({ startDate, endDate }) => {
        const startDateISO = startDate.toISOString().split("T")[0];
        const endDateISO = endDate.toISOString().split("T")[0];
        return {
          url: `/api/weather/${startDateISO}/${endDateISO}`,
        };
      },
      providesTags: (result) => ["Wind"],
    }),
  }),
});
