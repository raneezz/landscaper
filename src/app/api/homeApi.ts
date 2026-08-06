import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/constants";

export const homeApi = createApi({
  reducerPath: "homeApi",

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),

  //getCate
  endpoints: (builder) => ({
    getCategories: builder.query<any[], void>({
      query: () => "masterapi/master/categories?sort=asc",
      transformResponse: (response: any) => response.data,
    }),

    // getCateByid
    getProductsByCategory: builder.query<any[], number>({
      query: (categoryId) =>
        `listingapi/listing/livelisting?categoryId=${categoryId}`,
      transformResponse: (response: any) => response.data,
    }),
  }),
});

export const { useGetCategoriesQuery, useGetProductsByCategoryQuery } = homeApi;
