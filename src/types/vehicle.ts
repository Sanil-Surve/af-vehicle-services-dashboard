export type VehicleType = 'car' | 'bike' | 'scooter';

export interface Vehicle {
  id: string;
  slug: string;
  make: string;
  model: string;
  year: number;
  type: VehicleType;
  price_per_day: number;
  description: string;
  image_url: string;
  features: string[];
  is_available: boolean;
  created_at: string;
}

export interface VehicleFilter {
  type?: VehicleType;
  minPrice?: number;
  maxPrice?: number;
  available?: boolean;
}
