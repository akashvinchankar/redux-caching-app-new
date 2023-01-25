import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Screen {
  code: string;
  screen: string;
}

export const screensSlice = createApi({
  reducerPath: 'screensSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8081',
  }),
  keepUnusedDataFor: 28800,
  endpoints: (builder) => ({
    fetchScreens: builder.query<Screen[], string>({
      query: (code) => `getScreens?code=${code}`,
    }),
  }),
});

export const { useFetchScreensQuery } = screensSlice;
