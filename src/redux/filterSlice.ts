import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  categoryId: number | null;
  categoryName: string;

  emirate: string;

  minPrice: string;
  maxPrice: string;

  minQuantity: string;
  maxQuantity: string;

  quantityUnit: "Kg" | "Gram";
}

const initialState: FilterState = {
  categoryId: null,
  categoryName: "",

  emirate: "All Emirates",

  minPrice: "",
  maxPrice: "",

  minQuantity: "",
  maxQuantity: "",

  quantityUnit: "Kg",
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

    setEmirate: (state, action: PayloadAction<string>) => {
      state.emirate = action.payload;
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

      state.minPrice = "";
      state.maxPrice = "";

      state.minQuantity = "";
      state.maxQuantity = "";

      state.quantityUnit = "Kg";
    },
  },
});

export const {
  setCategory,
  setEmirate,
  setPrice,
  setQuantity,
  setQuantityUnit,
  clearFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
