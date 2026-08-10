import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductFilter } from "./ProductFilterParams";

export interface ApiFilter {
  field_name: string;
  field_type: string;
  operator: string;
  field_from_value?: number | null;
  field_to_value?: number | null;
}

interface FilterState {
  categoryId: number | null;
  categoryName: string;
  search: string;

  emirate: string;

  cityId: number | null;
  topFavorites: number | null;
  cityName: string;

  minPrice: string;
  maxPrice: string;

  minQuantity: string;
  maxQuantity: string;

  sort: string | null;
  sortBy: string | null;

  quantityUnit: "Kg" | "Gram";

  filters: ProductFilter[];
}

const initialState: FilterState = {
  categoryId: null,
  categoryName: "",
  search: "",

  emirate: "All Emirates",

  minPrice: "",
  maxPrice: "",

  cityId: null,
  topFavorites: 9,
  cityName: "",

  minQuantity: "",
  maxQuantity: "",

  quantityUnit: "Kg",

  sort: null,
  sortBy: null,

  filters: [],
};

const filterSlice = createSlice({
  name: "filters",

  initialState,

  reducers: {
    setCategory: (
      state,
      action: PayloadAction<{
        id: number;
        name: string;
      }>,
    ) => {
      state.categoryId = action.payload.id;
      state.categoryName = action.payload.name;
    },

    setCity: (
      state,
      action: PayloadAction<{
        id: number | null;
        name: string;
      }>,
    ) => {
      state.cityId = action.payload.id;
      state.cityName = action.payload.name;
    },

    setTopFavorites: (
      state,
      action: PayloadAction<{
        id: number | null;
      }>,
    ) => {
      state.topFavorites = action.payload.id;
    },

    setEmirate: (state, action: PayloadAction<string>) => {
      state.emirate = action.payload;
    },

    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },

    setPrice: (
      state,
      action: PayloadAction<{
        min?: string;
        max?: string;
      }>,
    ) => {
      if (action.payload.min !== undefined) {
        state.minPrice = action.payload.min;
      }

      if (action.payload.max !== undefined) {
        state.maxPrice = action.payload.max;
      }

      state.filters = state.filters.filter(
        (item) => item.field_name !== "price_sale",
      );

      if (state.minPrice !== "" || state.maxPrice !== "") {
        state.filters.push({
          field_name: "price_sale",
          field_type: "common",
          operator: "bt",

          field_from_value:
            state.minPrice !== "" ? Number(state.minPrice) : null,

          field_to_value: state.maxPrice !== "" ? Number(state.maxPrice) : null,
        });
      }
    },

    clearPrice: (state) => {
      state.minPrice = "";
      state.maxPrice = "";

      state.filters = state.filters.filter(
        (item) => item.field_name !== "price_sale",
      );
    },

    setSort: (state, action: PayloadAction<string | null>) => {
      state.sort = action.payload;
    },

    setSortBy: (state, action: PayloadAction<string | null>) => {
      state.sortBy = action.payload;
    },

    setQuantity: (
      state,
      action: PayloadAction<{
        min?: string;
        max?: string;
      }>,
    ) => {
      if (action.payload.min !== undefined) {
        state.minQuantity = action.payload.min;
      }

      if (action.payload.max !== undefined) {
        state.maxQuantity = action.payload.max;
      }
    },

    setQuantityUnit: (state, action: PayloadAction<"Kg" | "Gram">) => {
      state.quantityUnit = action.payload;
    },

    clearFilters: (state) => {
      state.categoryId = null;
      state.categoryName = "";

      state.emirate = "All Emirates";

      state.cityId = null;
      state.cityName = "";

      state.topFavorites = 9;

      state.minPrice = "";
      state.maxPrice = "";
      state.search = "";

      state.minQuantity = "";
      state.maxQuantity = "";

      state.quantityUnit = "Kg";

      state.sort = null;
      state.sortBy = null;

      state.filters = [];
    },
  },
});

export const {
  setCategory,
  setEmirate,
  setCity,
  setSort,
  setSortBy,
  setPrice,
  clearPrice,
  setTopFavorites,
  setQuantity,
  setQuantityUnit,
  clearFilters,
  setSearch,
} = filterSlice.actions;

export default filterSlice.reducer;
