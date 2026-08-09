export interface ProductFilterParams {
  categoryId?: number | null;
  subCategoryId?: number | null;
  limit?: number;
  index?: number;

  cityId?: number | null;
  topFavorites?: number | null;
  emirateId?: number | null;
  neighborhoodId?: number | null;

  minPrice?: number | null;
  maxPrice?: number | null;

  minQuantity?: number | null;
  maxQuantity?: number | null;
  quantityUnit?: "Kg" | "Gram";

  search?: string;

  sort?: string | null;
  sortBy?: string | null;
  filters?: ProductFilter[];
}
export interface Product {
  id: number;
  [key: string]: any;
}

export interface ProductFilter {
  field_name: string;
  field_type: string;
  operator: string;
  field_from_value: number | null;
  field_to_value: number | null;
}
