'use client';

import { useEffect, useState } from 'react';
import { vehicleService } from '@/services/vehicle.service';
import { Vehicle } from '@/types/vehicle';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { VehicleForm } from '@/components/admin/VehicleForm';
import Image from 'next/image';

export default function AdminVehiclesPage() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState<Vehicle | undefined>(undefined);

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

    const handleEdit = (vehicle: Vehicle) => {
        setEditingVehicle(vehicle);
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this vehicle?')) return;
        try {
            await vehicleService.deleteVehicle(id);
            loadVehicles();
        } catch (error) {
            console.error('Delete failed:', error);
            alert('Failed to delete vehicle');
        }
    };

    const handleFormSuccess = () => {
        setIsFormOpen(false);
        setEditingVehicle(undefined);
        loadVehicles();
    };

    const handleFormCancel = () => {
        setIsFormOpen(false);
        setEditingVehicle(undefined);
    };

    if (isFormOpen) {
        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-bold tracking-tight">
                    {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
                </h1>
                <VehicleForm
                    initialData={editingVehicle}
                    onSuccess={handleFormSuccess}
                    onCancel={handleFormCancel}
                />
            </div>
        );
    }

    if (loading) return <div>Loading vehicles...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Vehicles</h1>
                <Button onClick={() => setIsFormOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add Vehicle
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {vehicles.map((vehicle) => (
                    <div key={vehicle.id} className="group relative bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="aspect-video relative bg-gray-100">
                            <Image
                                src={vehicle.image_url}
                                alt={vehicle.model}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute top-2 right-2 flex gap-1">
                                {vehicle.is_available ? (
                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                                        <CheckCircle className="w-3 h-3 mr-1" /> Available
                                    </span>
                                ) : (
                                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full flex items-center">
                                        <XCircle className="w-3 h-3 mr-1" /> Unavailable
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="p-4">
                            <div className="mb-2">
                                <h3 className="font-semibold text-lg">{vehicle.make} {vehicle.model}</h3>
                                <p className="text-sm text-gray-500">{vehicle.type} • {vehicle.year}</p>
                            </div>

                            <div className="flex items-center justify-between mt-4 border-t pt-4">
                                <span className="font-bold text-lg">₹{vehicle.price_per_day}<span className="text-sm font-normal text-gray-500">/day</span></span>

                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button size="icon" variant="ghost" onClick={() => handleEdit(vehicle)}>
                                        <Pencil className="h-4 w-4 text-blue-600" />
                                    </Button>
                                    <Button size="icon" variant="ghost" onClick={() => handleDelete(vehicle.id)}>
                                        <Trash2 className="h-4 w-4 text-red-600" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
