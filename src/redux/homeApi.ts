import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constants";

export const homeApi = createApi({
  reducerPath: "homeApi",

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),

  //getCate
  endpoints: (builder) => ({
    getCategories: builder.query<any[], void>({
      query: () =>
        "masterapi/master/categories?sort=asc&sort_by=display_order&is_all=true&is_active=true",
      transformResponse: (response: any) => response.data,
    }),

    // getCateByid
    getProductsByCategory: builder.query<any[], number>({
      query: (categoryId) => ({
        url: "listingapi/listing/search",
        method: "POST",
        body: {
          category_id: categoryId,
          top_favorites: 9,
          index: 0,
          limit: 6,
          // priority_city_id: 1,
        },
      }),
      transformResponse: (response: any) => response.data,
    }),
  }),
});

export const { useGetCategoriesQuery, useGetProductsByCategoryQuery } = homeApi;
