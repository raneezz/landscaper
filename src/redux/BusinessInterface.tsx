export interface BusinessInterface {
  id: number;

  first_name_en?: string;
  last_name_en?: string;
  business_name?: string;
  business_description?: string;
  is_verified?: boolean;
  average_rating?: number;
  ratings_count?: number;

  [key: string]: any;
}
