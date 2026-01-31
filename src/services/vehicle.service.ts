import { createClient } from '@/lib/supabase/client';
import { Vehicle, VehicleFilter } from '@/types/vehicle';

export const vehicleService = {
  async getVehicles(filter?: VehicleFilter): Promise<Vehicle[]> {
    const supabase = createClient();
    let query = supabase.from('vehicles').select('*');

    if (filter?.type) {
      query = query.eq('type', filter.type);
    }
    if (filter?.available) {
      query = query.eq('is_available', true);
    }
    // Add price filtering if needed

    const { data, error } = await query;
    if (error) throw error;
    return data as Vehicle[];
  },

  async getVehicleBySlug(id: string): Promise<Vehicle | null> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) return null;
    return data as Vehicle;
  },
};
