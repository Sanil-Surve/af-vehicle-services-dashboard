import { vehicles } from '@/data/fleet';
import { VehicleType } from '@/types/vehicle';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{
        type: string;
        slug: string;
    }>;
}

export function generateStaticParams() {
    return vehicles.map((vehicle) => ({
        type: vehicle.type,
        slug: vehicle.slug,
    }));
}

export default async function VehicleDetailsPage({ params }: PageProps) {
    const { type, slug } = await params;

    const vehicle = vehicles.find(
        (v) => v.type === type && (v.slug === slug || v.id === slug)
    );

    if (!vehicle) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Link
                href="/fleet"
                className="mb-6 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
            >
                ← Back to Fleet
            </Link>

            <div className="grid gap-8 lg:grid-cols-2">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">
                    <Image
                        src={vehicle.image_url || '/placeholder-car.jpg'}
                        alt={`${vehicle.make} ${vehicle.model}`}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div>
                    <div className="flex items-center gap-2">
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary uppercase">
                            {vehicle.type}
                        </span>
                        {vehicle.is_available ? (
                            <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600">
                                Available
                            </span>
                        ) : (
                            <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-600">
                                Unavailable
                            </span>
                        )}
                    </div>

                    <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                        {vehicle.make} {vehicle.model}
                    </h1>
                    <p className="mt-2 text-xl text-muted-foreground">
                        {vehicle.year}
                    </p>

                    <div className="mt-6 flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-primary">
                            ₹{vehicle.price_per_day}
                        </span>
                        <span className="text-lg text-muted-foreground">/day</span>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-lg font-semibold">Description</h2>
                        <p className="mt-2 text-muted-foreground">{vehicle.description}</p>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-lg font-semibold">Key Features</h2>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {vehicle.features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="rounded-md bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground"
                                >
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10">
                        <button className="w-full rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 sm:w-auto">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
