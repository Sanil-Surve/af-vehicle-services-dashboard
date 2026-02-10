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

  async getVehicleById(id: string): Promise<Vehicle | null> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) return null;
    return data as Vehicle;
  },

  async getVehicleBySlug(slug: string): Promise<Vehicle | null> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) return null;
    return data as Vehicle;
  },

  async createVehicle(vehicleData: Partial<Vehicle>): Promise<Vehicle> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('vehicles')
      .insert(vehicleData)
      .select()
      .single();

    if (error) throw error;
    return data as Vehicle;
  },

  async updateVehicle(id: string, updates: Partial<Vehicle>): Promise<Vehicle> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('vehicles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Vehicle;
  },

  async deleteVehicle(id: string): Promise<void> {
    const supabase = createClient();
    const { error } = await supabase
      .from('vehicles')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async uploadImage(file: File): Promise<{ url: string; public_id: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Upload failed');
    }

    return response.json();
  },
};
