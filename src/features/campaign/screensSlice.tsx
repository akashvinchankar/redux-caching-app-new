import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Screen {
  code: string;
  screen: string;
}

export const screensSlice = createApi({
  reducerPath: 'screensSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8081/getScreens',
  }),
  keepUnusedDataFor: 28800,
  endpoints: (builder) => ({
    fetchScreens: builder.query<Screen[], void>({
      query: () => '',
    }),
  }),
});

export const { useFetchScreensQuery } = screensSlice;
