import { Vehicle } from './vehicle';

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  user_id: string;
  vehicle_id: string;
  start_date: string;
  end_date: string;
  total_price: number;
  status: BookingStatus;
  created_at: string;
  vehicle?: Vehicle; // Joined data
  profiles?: { // Joined data
    full_name: string;
    phone: string;
    avatar_url: string;
  };
}

export interface CreateBookingDTO {
  vehicle_id: string;
  start_date: Date;
  end_date: Date;
  total_price: number;
}

export interface UpdateBookingDTO {
  start_date?: Date;
  end_date?: Date;
  total_price?: number;
  status?: BookingStatus;
}

export interface BookingFilter {
  status?: BookingStatus;
  start_date?: string;
  end_date?: string;
  user_id?: string;
}
