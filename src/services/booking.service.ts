import { createClient } from '@/lib/supabase/client';
import { Booking, CreateBookingDTO, UpdateBookingDTO, BookingFilter } from '@/types/booking';

export const bookingService = {
  async createBooking(bookingData: CreateBookingDTO): Promise<Booking> {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('bookings')
      .insert({
        ...bookingData,
        start_date: bookingData.start_date.toISOString(),
        end_date: bookingData.end_date.toISOString(),
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

  async getBookingById(id: string): Promise<Booking | null> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('bookings')
      .select('*, vehicle:vehicles(*)')
      .eq('id', id)
      .single();

    if (error) return null;
    return data as Booking;
  },

  async updateBooking(id: string, updates: UpdateBookingDTO): Promise<Booking> {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('User not authenticated');

    // Verify user owns this booking
    const booking = await this.getBookingById(id);
    if (!booking || booking.user_id !== user.id) {
      throw new Error('Unauthorized or booking not found');
    }

    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', id)
      .select('*, vehicle:vehicles(*)')
      .single();

    if (error) throw error;
    return data as Booking;
  },

  async cancelBooking(id: string): Promise<Booking> {
    return this.updateBooking(id, { status: 'cancelled' });
  },

  async getAllBookings(filter?: BookingFilter): Promise<Booking[]> {
    const supabase = createClient();
    let query = supabase
      .from('bookings')
      .select('*, vehicle:vehicles(*), profiles(*)');

    if (filter?.status) {
      query = query.eq('status', filter.status);
    }
    // ... other filters can be added back if needed

    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;
    if (error) throw error;
    return data as Booking[];
  },
};
