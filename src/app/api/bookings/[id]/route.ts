import { NextRequest, NextResponse } from 'next/server';
import { bookingService } from '@/services/booking.service';
import { UpdateBookingDTO } from '@/types/booking';

/**
 * GET /api/bookings/:id
 * Fetch a specific booking by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const booking = await bookingService.getBookingById(id);

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          error: 'Booking not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch booking',
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/bookings/:id
 * Update a booking (status, dates, etc.)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body: UpdateBookingDTO = await request.json();

    const booking = await bookingService.updateBooking(id, body);

    return NextResponse.json({
      success: true,
      data: booking,
      message: 'Booking updated successfully',
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    const statusCode = error instanceof Error && error.message.includes('Unauthorized') ? 403 : 500;
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update booking',
      },
      { status: statusCode }
    );
  }
}

/**
 * DELETE /api/bookings/:id
 * Cancel a booking (sets status to 'cancelled')
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const booking = await bookingService.cancelBooking(id);

    return NextResponse.json({
      success: true,
      data: booking,
      message: 'Booking cancelled successfully',
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    const statusCode = error instanceof Error && error.message.includes('Unauthorized') ? 403 : 500;
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to cancel booking',
      },
      { status: statusCode }
    );
  }
}
