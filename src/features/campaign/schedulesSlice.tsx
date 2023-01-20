import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Schedule {
  id: number;
  schedule: string;
}

export const schedulesSlice = createApi({
  reducerPath: 'schedulesSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8081',
  }),
  serializeQueryArgs: (query: any) => query.queryArgs,
  keepUnusedDataFor: 28800,
  endpoints: (builder) => ({
    fetchSchedules: builder.query<Schedule[], number>({
      query: (id) => `getSchedules?id=${id}`,
    }),
  }),
});

export const { useFetchSchedulesQuery } = schedulesSlice;
