import Link from 'next/link';
import Image from 'next/image';
import { Vehicle } from '@/types/vehicle';
// Assuming lucide-react icons or similar
// import { Fuel, Gauge, Settings } from 'lucide-react';

interface VehicleCardProps {
    vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
    return (
        <div className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md">
            <div className="aspect-[16/10] relative overflow-hidden">
                <Image
                    src={vehicle.image_url || '/placeholder-car.jpg'}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-black backdrop-blur-sm">
                    {vehicle.type.toUpperCase()}
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold truncate">
                    {vehicle.make} {vehicle.model}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{vehicle.year} • {vehicle.description?.slice(0, 50)}...</p>

                {/* Quick Specs - mocked based on features or added properties */}
                <div className="mt-4 flex flex-wrap gap-2">
                    {vehicle.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="rounded-md bg-secondary px-2 py-1 text-[10px] font-medium text-secondary-foreground">
                            {feature}
                        </div>
                    ))}
                    {vehicle.features.length > 3 && (
                        <div className="rounded-md bg-secondary px-2 py-1 text-[10px] font-medium text-secondary-foreground">
                            +{vehicle.features.length - 3}
                        </div>
                    )}
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <div>
                        <span className="text-lg font-bold text-primary">{`₹${vehicle.price_per_day}`}</span>
                        <span className="text-sm text-muted-foreground">/day</span>
                    </div>
                    <Link
                        href={`/fleet/${vehicle.type}/${vehicle.slug || vehicle.id}`}
                        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
