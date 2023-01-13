import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Show {
  id: number;
  show: string;
}

export const showsSlice = createApi({
  reducerPath: 'showsSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8081/getShows',
  }),
  keepUnusedDataFor: 28800,
  endpoints: (builder) => ({
    fetchShows: builder.query<Show[], void>({
      query: () => '',
    }),
  }),
});

export const { useFetchShowsQuery } = showsSlice;
