'use client';

import { useEffect, useState } from 'react';
import { bookingService } from '@/services/booking.service';
import { Booking } from '@/types/booking';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';

export default function BookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {
        try {
            setLoading(true);
            const data = await bookingService.getUserBookings();
            setBookings(data);
        } catch (err) {
            console.error('Failed to load bookings:', err);
            setError('Failed to load bookings. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8 text-center min-h-[50vh] flex flex-col justify-center">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                    onClick={loadBookings}
                    className="text-primary hover:underline"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

            {bookings.length === 0 ? (
                <div className="text-center py-12 bg-muted/30 rounded-lg">
                    <h3 className="text-xl font-medium mb-2">No bookings yet</h3>
                    <p className="text-muted-foreground mb-6">You haven't made any bookings yet.</p>
                    <Link
                        href="/fleet"
                        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                    >
                        Browse Fleet
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="border rounded-lg overflow-hidden bg-card shadow-sm hover:shadow-md transition-shadow">
                            <div className="relative h-48 bg-muted">
                                {booking.vehicle ? (
                                    <Image
                                        src={booking.vehicle.image_url || '/placeholder-car.jpg'}
                                        alt={`${booking.vehicle.make} ${booking.vehicle.model}`}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-muted-foreground">
                                        Vehicle details unavailable
                                    </div>
                                )}
                                <div className="absolute top-2 right-2">
                                    <span className={`
                                        px-2 py-1 rounded-full text-xs font-medium uppercase
                                        ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-red-100 text-red-800'}
                                    `}>
                                        {booking.status}
                                    </span>
                                </div>
                            </div>

                            <div className="p-4">
                                {booking.vehicle && (
                                    <h3 className="font-semibold text-lg mb-1">
                                        {booking.vehicle.make} {booking.vehicle.model}
                                    </h3>
                                )}
                                <div className="space-y-2 text-sm text-muted-foreground mt-3">
                                    <div className="flex justify-between">
                                        <span>Start Date:</span>
                                        <span className="font-medium text-foreground">
                                            {format(new Date(booking.start_date), 'PPP')}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>End Date:</span>
                                        <span className="font-medium text-foreground">
                                            {format(new Date(booking.end_date), 'PPP')}
                                        </span>
                                    </div>
                                    <div className="pt-2 mt-2 border-t flex justify-between items-center">
                                        <span>Total Price:</span>
                                        <span className="text-lg font-bold text-primary">
                                            ₹{booking.total_price.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
