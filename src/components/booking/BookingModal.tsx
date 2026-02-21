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
    const [dateOfHire, setDateOfHire] = useState('');
    const [dateOfSubmission, setDateOfSubmission] = useState('');
    const [timeOfHire, setTimeOfHire] = useState('');
    const [timeOfSubmission, setTimeOfSubmission] = useState('');
    const [location, setLocation] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [purpose, setPurpose] = useState('');
    const [mainPlaceOfVisit, setMainPlaceOfVisit] = useState('');
    const [expectedKms, setExpectedKms] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    if (!isOpen) return null;

    // Calculate total price based on date range
    const calculateTotalPrice = (): number => {
        if (!dateOfHire || !dateOfSubmission) return 0;

        const start = new Date(dateOfHire);
        const end = new Date(dateOfSubmission);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays * vehicle.price_per_day;
    };

    const totalPrice = calculateTotalPrice();

    const resetForm = () => {
        setDateOfHire('');
        setDateOfSubmission('');
        setTimeOfHire('');
        setTimeOfSubmission('');
        setLocation('');
        setContactNo('');
        setPurpose('');
        setMainPlaceOfVisit('');
        setExpectedKms('');
        setError('');
        setSuccess(false);
    };

    const handleBooking = async () => {
        try {
            setLoading(true);
            setError('');

            // Validate required fields
            if (!dateOfHire || !dateOfSubmission) {
                setError('Please select both date of hire and date of submission');
                return;
            }
            if (!timeOfHire || !timeOfSubmission) {
                setError('Please select both time of hire and time of submission');
                return;
            }
            if (!location.trim()) {
                setError('Please enter a location');
                return;
            }
            if (!contactNo.trim()) {
                setError('Please enter a contact number');
                return;
            }

            // Combine date + time
            const start = new Date(`${dateOfHire}T${timeOfHire}`);
            const end = new Date(`${dateOfSubmission}T${timeOfSubmission}`);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (start < today) {
                setError('Date of hire must be today or later');
                return;
            }

            if (end <= start) {
                setError('Date of submission must be after date of hire');
                return;
            }

            // Create booking
            await bookingService.createBooking({
                vehicle_id: vehicle.id,
                start_date: start,
                end_date: end,
                total_price: totalPrice,
                location: location.trim(),
                contact_no: contactNo.trim(),
                purpose: purpose.trim() || undefined,
                main_place_of_visit: mainPlaceOfVisit.trim() || undefined,
                expected_kms: expectedKms ? Number(expectedKms) : undefined,
            });

            // Show success state
            setSuccess(true);

            // Close modal and redirect after a short delay
            setTimeout(() => {
                resetForm();
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
            resetForm();
            onClose();
        }
    };

    // Get today's date in YYYY-MM-DD format for min date
    const today = new Date().toISOString().split('T')[0];

    const inputClass = "w-full border border-border bg-background text-foreground rounded-md p-2 disabled:opacity-50 disabled:cursor-not-allowed [color-scheme:dark]";
    const labelClass = "block text-sm font-medium mb-1";

    const isFormValid = dateOfHire && dateOfSubmission && timeOfHire && timeOfSubmission && location.trim() && contactNo.trim();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={handleClose}>
            <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-card text-card-foreground p-6 shadow-xl border border-border" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-bold mb-4">Book {vehicle.make} {vehicle.model}</h2>

                {success ? (
                    <div className="py-8 text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
                            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-green-400 mb-2">Booking Confirmed!</h3>
                        <p className="text-sm text-muted-foreground">Your booking has been created successfully.</p>
                    </div>
                ) : (
                    <>
                        <div className="space-y-4">
                            {/* Location */}
                            <div>
                                <label className={labelClass}>Location <span className="text-destructive">*</span></label>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Enter pickup location"
                                    disabled={loading}
                                    className={inputClass}
                                />
                            </div>

                            {/* Date of Hire & Time of Hire */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className={labelClass}>Date of Hire <span className="text-destructive">*</span></label>
                                    <input
                                        type="date"
                                        value={dateOfHire}
                                        min={today}
                                        onChange={(e) => setDateOfHire(e.target.value)}
                                        disabled={loading}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Time of Hire <span className="text-destructive">*</span></label>
                                    <input
                                        type="time"
                                        value={timeOfHire}
                                        onChange={(e) => setTimeOfHire(e.target.value)}
                                        disabled={loading}
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            {/* Date of Submission & Time of Submission */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className={labelClass}>Date of Submission <span className="text-destructive">*</span></label>
                                    <input
                                        type="date"
                                        value={dateOfSubmission}
                                        min={dateOfHire || today}
                                        onChange={(e) => setDateOfSubmission(e.target.value)}
                                        disabled={loading}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Time of Submission <span className="text-destructive">*</span></label>
                                    <input
                                        type="time"
                                        value={timeOfSubmission}
                                        onChange={(e) => setTimeOfSubmission(e.target.value)}
                                        disabled={loading}
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            {/* Contact No */}
                            <div>
                                <label className={labelClass}>Contact No <span className="text-destructive">*</span></label>
                                <input
                                    type="tel"
                                    value={contactNo}
                                    onChange={(e) => setContactNo(e.target.value)}
                                    placeholder="Enter contact number"
                                    disabled={loading}
                                    className={inputClass}
                                />
                            </div>

                            {/* Optional Fields Section */}
                            <div className="border-t border-border pt-4 mt-2">
                                <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider font-medium">Optional Details</p>

                                {/* Purpose of Hire */}
                                <div className="mb-3">
                                    <label className={labelClass}>Purpose of Hire</label>
                                    <input
                                        type="text"
                                        value={purpose}
                                        onChange={(e) => setPurpose(e.target.value)}
                                        placeholder="e.g. Client meeting, Site visit"
                                        disabled={loading}
                                        className={inputClass}
                                    />
                                </div>

                                {/* Main Place of Visit */}
                                <div className="mb-3">
                                    <label className={labelClass}>Main Place of Visit</label>
                                    <input
                                        type="text"
                                        value={mainPlaceOfVisit}
                                        onChange={(e) => setMainPlaceOfVisit(e.target.value)}
                                        placeholder="e.g. City center, Airport"
                                        disabled={loading}
                                        className={inputClass}
                                    />
                                </div>

                                {/* Expected Kms Run */}
                                <div>
                                    <label className={labelClass}>Expected Kms Run</label>
                                    <input
                                        type="number"
                                        value={expectedKms}
                                        onChange={(e) => setExpectedKms(e.target.value)}
                                        placeholder="e.g. 150"
                                        min="0"
                                        disabled={loading}
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            {/* Total Price */}
                            {totalPrice > 0 && (
                                <div className="rounded-lg bg-primary/10 p-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">Total Price:</span>
                                        <span className="text-lg font-bold text-primary">₹{totalPrice.toLocaleString()}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {Math.ceil((new Date(dateOfSubmission).getTime() - new Date(dateOfHire).getTime()) / (1000 * 60 * 60 * 24))} days × ₹{vehicle.price_per_day}/day
                                    </p>
                                </div>
                            )}

                            {error && (
                                <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-3">
                                    <p className="text-sm text-destructive">{error}</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 flex justify-end gap-2">
                            <button
                                onClick={handleClose}
                                disabled={loading}
                                className="px-4 py-2 border border-border rounded-md hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleBooking}
                                disabled={!isFormValid || loading}
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
