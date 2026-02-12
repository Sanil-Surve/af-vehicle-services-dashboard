'use client';

import { useEffect, useState } from 'react';
import { vehicleService } from '@/services/vehicle.service';
import { Vehicle, VehicleType } from '@/types/vehicle';
import VehicleCard from '@/components/vehicle/VehicleCard';
import Link from 'next/link';

export default function FleetPage() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<VehicleType | 'all'>('all');

    useEffect(() => {
        loadVehicles();
    }, []);

    useEffect(() => {
        // Filter vehicles when category changes
        if (selectedCategory === 'all') {
            setFilteredVehicles(vehicles);
        } else {
            setFilteredVehicles(vehicles.filter(v => v.type === selectedCategory));
        }
    }, [selectedCategory, vehicles]);

    const loadVehicles = async () => {
        try {
            const data = await vehicleService.getVehicles();
            setVehicles(data);
            setFilteredVehicles(data);
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

            {/* Filter Section */}
            <div className="mb-6 flex items-center gap-4">
                <label htmlFor="category-filter" className="text-sm font-medium">
                    Filter by Category:
                </label>
                <select
                    id="category-filter"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as VehicleType | 'all')}
                    className="rounded-md border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                    <option value="all">All Vehicles</option>
                    <option value="car">Cars</option>
                    <option value="bike">Bikes</option>
                    <option value="scooter">Scooters</option>
                </select>
                {/* <span className="text-sm text-muted-foreground">
                    ({filteredVehicles.length} {filteredVehicles.length === 1 ? 'vehicle' : 'vehicles'})
                </span> */}
            </div>

            {filteredVehicles.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No vehicles found in this category.</p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredVehicles.map((vehicle) => (
                        <VehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))}
                </div>
            )}
        </div>
    );
}