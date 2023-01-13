import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import axios from 'axios';

export interface Order {
  id: string;
  Order: string;
}

// const campaignsBaseQuery = async ({ id }: { id: string }) => {
//   const result = await axios.get(`http://localhost:8081/getOrders?id=${id}`);
//   return result.data;
// };

export const campaignsSlice = createApi({
  reducerPath: 'campaignsSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8081',
  }),
  serializeQueryArgs: (query: any) => query.queryArgs,
  keepUnusedDataFor: 28800,
  endpoints: (builder) => ({
    fetchCampaigns: builder.query<Order[], string>({
      query: (id) => `getOrders?id=${id}`,
    }),
  }),
});

export const { useFetchCampaignsQuery } = campaignsSlice;
