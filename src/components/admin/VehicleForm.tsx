'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Vehicle, VehicleType } from '@/types/vehicle';
import { vehicleService } from '@/services/vehicle.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Car, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface VehicleFormProps {
    initialData?: Vehicle;
    onSuccess: () => void;
    onCancel: () => void;
}

export function VehicleForm({ initialData, onSuccess, onCancel }: VehicleFormProps) {
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState(initialData?.image_url || '');

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<Partial<Vehicle>>({
        defaultValues: initialData || {
            is_available: true,
            features: [],
            type: 'car',
        },
    });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const { url } = await vehicleService.uploadImage(file);
            setImageUrl(url);
            setValue('image_url', url);
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Image upload failed');
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (data: Partial<Vehicle>) => {
        setLoading(true);
        try {
            const formattedData = {
                ...data,
                year: Number(data.year),
                price_per_day: Number(data.price_per_day),
                image_url: imageUrl,
                features: typeof data.features === 'string'
                    ? (data.features as string).split(',').map((f: string) => f.trim())
                    : data.features,
            };

            if (initialData?.id) {
                await vehicleService.updateVehicle(initialData.id, formattedData);
            } else {
                await vehicleService.createVehicle(formattedData);
            }
            onSuccess();
        } catch (error) {
            console.error('Submission failed:', error);
            alert('Failed to save vehicle');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl bg-white p-6 rounded-lg shadow-sm">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="make">Make</Label>
                    <Input id="make" {...register('make', { required: true })} placeholder="e.g. Toyota" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input id="model" {...register('model', { required: true })} placeholder="e.g. Camry" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="slug">Slug (Unique ID)</Label>
                    <Input id="slug" {...register('slug', { required: true })} placeholder="e.g. toyota-camry-2024" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input id="year" type="number" {...register('year', { required: true })} placeholder="2024" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select
                        onValueChange={(val: any) => setValue('type', val as VehicleType)}
                        defaultValue={initialData?.type || 'car'}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="car">Car</SelectItem>
                            <SelectItem value="bike">Bike</SelectItem>
                            <SelectItem value="scooter">Scooter</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="price">Price Per Day (₹)</Label>
                    <Input id="price" type="number" {...register('price_per_day', { required: true })} />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" {...register('description')} />
            </div>

            <div className="space-y-2">
                <Label>Vehicle Image</Label>
                <div className="flex items-center gap-4">
                    <div className="relative w-32 h-24 border rounded bg-gray-50 flex items-center justify-center overflow-hidden">
                        {imageUrl ? (
                            <Image src={imageUrl} alt="Vehicle" fill className="object-cover" />
                        ) : (
                            <Car className="text-gray-300 w-8 h-8" />
                        )}
                    </div>
                    <div className="flex-1">
                        <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                        {uploading && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
                <Button type="submit" disabled={loading || uploading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {initialData ? 'Update Vehicle' : 'Create Vehicle'}
                </Button>
            </div>
        </form>
    );
}
