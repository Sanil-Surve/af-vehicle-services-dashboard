'use client';

import { useEffect, useState } from 'react';
import { bookingService } from '@/services/booking.service';
import { Booking, BookingStatus } from '@/types/booking';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { format } from 'date-fns';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {
        try {
            const data = await bookingService.getAllBookings();
            setBookings(data);
        } catch (error) {
            console.error('Failed to load bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id: string, status: BookingStatus) => {
        try {
            await bookingService.updateBooking(id, { status });
            loadBookings(); // Refresh list
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    if (loading) return <div>Loading bookings...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
            </div>

            <div className="border border-border rounded-lg bg-card overflow-hidden shadow-sm">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-muted-foreground uppercase bg-muted border-b border-border">
                        <tr>
                            <th className="px-6 py-3">Booking ID</th>
                            <th className="px-6 py-3">User</th>
                            <th className="px-6 py-3">Vehicle</th>
                            <th className="px-6 py-3">Dates</th>
                            <th className="px-6 py-3">Total</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.id} className="border-b border-border hover:bg-muted/50">
                                <td className="px-6 py-4 font-medium text-foreground whitespace-nowrap">
                                    #{booking.id.slice(0, 8)}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-medium">{booking.profiles?.full_name || 'Unknown'}</span>
                                        {/* <span className="text-xs text-gray-500">{booking.user_id.slice(0, 8)}...</span> */}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {booking.vehicle?.make} {booking.vehicle?.model}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col text-xs">
                                        <span>{format(new Date(booking.start_date), 'MMM dd, yyyy')}</span>
                                        <span className="text-muted-foreground">to</span>
                                        <span>{format(new Date(booking.end_date), 'MMM dd, yyyy')}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    ₹{booking.total_price}
                                </td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={booking.status} />
                                </td>
                                <td className="px-6 py-4">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => handleStatusChange(booking.id, 'confirmed')}>
                                                Mark as Confirmed
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleStatusChange(booking.id, 'completed')}>
                                                Mark as Completed
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleStatusChange(booking.id, 'cancelled')} className="text-destructive">
                                                Cancel Booking
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
