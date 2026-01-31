'use client'

import { useState } from 'react';
import { Vehicle } from '@/types/vehicle';
import { useBookingStore } from '@/store/booking.store';
import { useRouter } from 'next/navigation';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    vehicle: Vehicle;
}

export default function BookingModal({ isOpen, onClose, vehicle }: BookingModalProps) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const { selectVehicle, setDates } = useBookingStore();
    const router = useRouter();

    if (!isOpen) return null;

    const handleBooking = () => {
        selectVehicle(vehicle);
        setDates({
            from: startDate ? new Date(startDate) : undefined,
            to: endDate ? new Date(endDate) : undefined
        });
        onClose();
        alert('Booking Initiated! (Mock)');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                <h2 className="text-xl font-bold mb-4">Book {vehicle.make} {vehicle.model}</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Start Date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full border rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">End Date</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full border rounded-md p-2"
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 border rounded-md hover:bg-gray-50">Cancel</button>
                    <button
                        onClick={handleBooking}
                        disabled={!startDate || !endDate}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
                    >
                        Confirm Booking
                    </button>
                </div>
            </div>
        </div>
    );
}
