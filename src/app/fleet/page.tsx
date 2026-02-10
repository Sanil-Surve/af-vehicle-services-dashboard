'use client';

import { useEffect, useState } from 'react';
import { vehicleService } from '@/services/vehicle.service';
import { Vehicle } from '@/types/vehicle';
import VehicleCard from '@/components/vehicle/VehicleCard';
import Link from 'next/link';

export default function FleetPage() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadVehicles();
    }, []);

    const loadVehicles = async () => {
        try {
            const data = await vehicleService.getVehicles();
            setVehicles(data);
        } catch (error) {
            console.error('Failed to load vehicles:', error);
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

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <Link href="/" className="mb-6 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary">
                    ← <span>Back to Home</span>
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">Our Fleet</h1>
                <p className="mt-2 text-muted-foreground">
                    Choose from our wide range of premium vehicles for your journey.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {vehicles.map((vehicle) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
            </div>
        </div>
    );
}