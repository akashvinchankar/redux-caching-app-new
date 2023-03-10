import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Order {
  id: string;
  Order: string;
}

export const campaignsSlice = createApi({
  reducerPath: 'campaignsSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8081',
  }),
  serializeQueryArgs: (query: any) => query.queryArgs,
  keepUnusedDataFor: 28800,
  endpoints: (builder) => ({
    fetchCampaigns: builder.query<Order[], string | null>({
      query: (id) => `getOrders?id=${id}`,
    }),
  }),
});

export const { useFetchCampaignsQuery } = campaignsSlice;
