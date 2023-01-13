import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Schedule {
  id: number;
  schedule: string;
}

export const schedulesSlice = createApi({
  reducerPath: 'schedulesSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8081/getSchedules',
  }),
  keepUnusedDataFor: 28800,
  endpoints: (builder) => ({
    fetchSchedules: builder.query<Schedule[], void>({
      query: () => '',
    }),
  }),
});

export const { useFetchSchedulesQuery } = schedulesSlice;
