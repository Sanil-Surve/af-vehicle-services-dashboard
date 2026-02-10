import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';
import { vehicles } from '@/data/fleet';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Prepare vehicles for insertion
    // We remove the static ID to let Supabase generate UUIDs
    // We'll use slug as the unique identifier for upsert to avoid duplicates
    const vehiclesToInsert = vehicles.map(vehicle => {
      const { id, ...vehicleData } = vehicle;
      return vehicleData;
    });

    const { data, error } = await supabase
      .from('vehicles')
      .upsert(vehiclesToInsert, { onConflict: 'slug' })
      .select();

    if (error) {
      console.error('Error seeding vehicles:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: `Successfully seeded ${data.length} vehicles`,
      data 
    });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}
