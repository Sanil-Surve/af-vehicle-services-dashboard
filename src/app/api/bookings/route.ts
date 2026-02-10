import { NextRequest, NextResponse } from 'next/server';
import { bookingService } from '@/services/booking.service';
import { CreateBookingDTO } from '@/types/booking';

/**
 * GET /api/bookings
 * Fetch all bookings for the authenticated user or filtered bookings
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const start_date = searchParams.get('start_date');
    const end_date = searchParams.get('end_date');

    const filter = {
      ...(status && { status: status as any }),
      ...(start_date && { start_date }),
      ...(end_date && { end_date }),
    };

    const bookings = await bookingService.getUserBookings();
    
    return NextResponse.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch bookings',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/bookings
 * Create a new booking
 */
export async function POST(request: NextRequest) {
  try {
    const body: CreateBookingDTO = await request.json();

    // Validate required fields
    if (!body.vehicle_id || !body.start_date || !body.end_date || !body.total_price) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: vehicle_id, start_date, end_date, total_price',
        },
        { status: 400 }
      );
    }

    const booking = await bookingService.createBooking(body);

    return NextResponse.json(
      {
        success: true,
        data: booking,
        message: 'Booking created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create booking',
      },
      { status: 500 }
    );
  }
}
