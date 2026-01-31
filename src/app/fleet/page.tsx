import { vehicles } from '@/data/fleet';
import VehicleCard from '@/components/vehicle/VehicleCard';

export default function FleetPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
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