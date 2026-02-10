import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { Vehicle } from '@/types/vehicle';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = await createClient();

    // Basic validation
    const requiredFields = ['slug', 'make', 'model', 'year', 'type', 'price_per_day', 'description', 'image_url'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Prepare data for insertion
    const vehicleData: Partial<Vehicle> = {
      ...body,
      is_available: body.is_available ?? true, // Default to true if not provided
      features: body.features ?? [], // Default to empty array if not provided
      // created_at and id are handled by Supabase default
    };

    const { data, error } = await supabase
      .from('vehicles')
      .insert(vehicleData)
      .select()
      .single();

    if (error) {
      console.error('Database insertion error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Request processing error:', error);
    return NextResponse.json(
      { error: 'Invalid request body or server error' },
      { status: 500 }
    );
  }
}
