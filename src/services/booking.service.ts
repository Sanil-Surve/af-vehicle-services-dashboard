import { createClient } from '@/lib/supabase/client';
import { Booking, CreateBookingDTO } from '@/types/booking';

export const bookingService = {
  async createBooking(bookingData: CreateBookingDTO): Promise<Booking> {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('bookings')
      .insert({
        ...bookingData,
        user_id: user.id,
        status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;
    return data as Booking;
  },

  async getUserBookings(): Promise<Booking[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('bookings')
      .select('*, vehicle:vehicles(*)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Booking[];
  },
};
