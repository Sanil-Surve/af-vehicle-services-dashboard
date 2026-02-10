'use client'

import { useState } from 'react';
import { Vehicle } from '@/types/vehicle';
import { bookingService } from '@/services/booking.service';
import { useRouter } from 'next/navigation';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    vehicle: Vehicle;
}

export default function BookingModal({ isOpen, onClose, vehicle }: BookingModalProps) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    if (!isOpen) return null;

    // Calculate total price based on date range
    const calculateTotalPrice = (): number => {
        if (!startDate || !endDate) return 0;

        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays * vehicle.price_per_day;
    };

    const totalPrice = calculateTotalPrice();

    const handleBooking = async () => {
        try {
            setLoading(true);
            setError('');

            // Validate dates
            if (!startDate || !endDate) {
                setError('Please select both start and end dates');
                return;
            }

            const start = new Date(startDate);
            const end = new Date(endDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (start < today) {
                setError('Start date must be today or later');
                return;
            }

            if (end <= start) {
                setError('End date must be after start date');
                return;
            }

            // Create booking
            const booking = await bookingService.createBooking({
                vehicle_id: vehicle.id,
                start_date: start,
                end_date: end,
                total_price: totalPrice
            });

            // Show success state
            setSuccess(true);

            // Close modal and redirect after a short delay
            setTimeout(() => {
                setStartDate('');
                setEndDate('');
                setSuccess(false);
                onClose();
                router.push('/dashboard/bookings');
            }, 2000);

        } catch (err) {
            console.error('Booking error:', err);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Failed to create booking. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!loading) {
            setStartDate('');
            setEndDate('');
            setError('');
            setSuccess(false);
            onClose();
        }
    };

    // Get today's date in YYYY-MM-DD format for min date
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={handleClose}>
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-bold mb-4">Book {vehicle.make} {vehicle.model}</h2>

                {success ? (
                    <div className="py-8 text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-green-900 mb-2">Booking Confirmed!</h3>
                        <p className="text-sm text-gray-600">Your booking has been created successfully.</p>
                    </div>
                ) : (
                    <>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Start Date</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    min={today}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    disabled={loading}
                                    className="w-full border rounded-md p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">End Date</label>
                                <input
                                    type="date"
                                    value={endDate}
                                    min={startDate || today}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    disabled={loading}
                                    className="w-full border rounded-md p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>

                            {totalPrice > 0 && (
                                <div className="rounded-lg bg-primary/10 p-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">Total Price:</span>
                                        <span className="text-lg font-bold text-primary">₹{totalPrice.toLocaleString()}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))} days × ₹{vehicle.price_per_day}/day
                                    </p>
                                </div>
                            )}

                            {error && (
                                <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                                    <p className="text-sm text-red-800">{error}</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 flex justify-end gap-2">
                            <button
                                onClick={handleClose}
                                disabled={loading}
                                className="px-4 py-2 border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleBooking}
                                disabled={!startDate || !endDate || loading}
                                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {loading && (
                                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                )}
                                {loading ? 'Creating...' : 'Confirm Booking'}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
