export interface AdDetailsInterface {
  id: number;
  listing_id?: number;
  listing_uuid?: string;

  title_en?: string;
  title_ar?: string;
  description_en?: string;
  description_ar?: string;

  price_sale?: number;
  quantity?: number;
  quantity_unit?: string;

  created_at?: string;

  location?: string;
  formatted_address?: string;

  latitude?: number;
  longitude?: number;

  business_name?: string;
  business_logo?: string;

  rating?: number;
  ratings_count?: number;

  images?: string[];

  [key: string]: any;
}
