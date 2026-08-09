import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constants";
import { Product, ProductFilterParams } from "./ProductFilterParams";

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

    //getEmir
    getCities: builder.query<any[], void>({
      query: () => "masterapi/master/cities",
      transformResponse: (response: any) => response.data,
    }),
    // getCateByid
    getProductsByCategory: builder.query<
      {
        data: Product[];
        total_count: number;
      },
      ProductFilterParams
    >({
      query: ({
        categoryId,
        cityId,
        limit,
        index = 0,
        sortBy,
        minPrice,
        maxPrice,
        minQuantity,
        maxQuantity,
        quantityUnit,
        search,
        subCategoryId,
      }) => ({
        url: "listingapi/listing/search",
        method: "POST",
        body: {
          category_id: categoryId ?? null,
          city_id: cityId ?? null,
          sub_category_id: subCategoryId ?? null,
          top_favorites: 9,
          index,
          limit,
          sort_by: sortBy ?? null,
          min_price: minPrice ?? null,
          max_price: maxPrice ?? null,
          min_quantity: minQuantity ?? null,
          max_quantity: maxQuantity ?? null,
          quantity_unit: quantityUnit ?? null,
          search: search ?? "",
        },
      }),

      transformResponse: (response: any) => ({
        data: response?.data ?? [],
        total_count: response?.total_count ?? 0,
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCitiesQuery,
  useGetProductsByCategoryQuery,
} = homeApi;
