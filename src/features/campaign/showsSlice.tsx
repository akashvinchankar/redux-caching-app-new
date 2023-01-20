import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Show {
  id: number;
  show: string;
}

export const showsSlice = createApi({
  reducerPath: 'showsSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8081',
  }),
  serializeQueryArgs: (query: any) => query.queryArgs,
  keepUnusedDataFor: 28800,
  endpoints: (builder) => ({
    fetchShows: builder.query<Show[], number>({
      query: (id) => `getShows?id=${id}`,
    }),
  }),
});

export const { useFetchShowsQuery } = showsSlice;
