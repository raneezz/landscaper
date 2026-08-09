export interface ProductFilterParams {
  categoryId?: number | null;
  subCategoryId?: number | null;
  limit?: number;
  index?: number;

  cityId?: number | null;
  emirateId?: number | null;
  neighborhoodId?: number | null;

  minPrice?: number | null;
  maxPrice?: number | null;

  minQuantity?: number | null;
  maxQuantity?: number | null;
  quantityUnit?: "Kg" | "Gram";

  search?: string;

  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
export interface Product {
  id: number;
  [key: string]: any;
}
