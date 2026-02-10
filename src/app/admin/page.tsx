'use client';

import { useEffect, useState } from 'react';
import { bookingService } from '@/services/booking.service';
import { vehicleService } from '@/services/vehicle.service';
import { createClient } from '@/lib/supabase/client';
import { ArrowUpRight, ArrowDownRight, Users, Calendar, Car, DollarSign } from 'lucide-react';

export default function AdminDashboardPage() {
    const [stats, setStats] = useState({
        totalBookings: 0,
        totalRevenue: 0,
        activeVehicles: 0,
        totalUsers: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            const bookings = await bookingService.getAllBookings();
            const vehicles = await vehicleService.getVehicles();
            const supabase = createClient();
            const { count: userCount } = await supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true });

            const totalRevenue = bookings
                .filter(b => b.status !== 'cancelled')
                .reduce((sum, b) => sum + Number(b.total_price), 0);

            setStats({
                totalBookings: bookings.length,
                totalRevenue,
                activeVehicles: vehicles.filter(v => v.is_available).length,
                totalUsers: userCount || 0,
            });
        };

        fetchData();
    }, []);

    const cards = [
        {
            name: 'Total Revenue',
            value: `₹${stats.totalRevenue.toLocaleString()}`,
            icon: DollarSign,
            change: '+4.75%',
            changeType: 'positive',
        },
        {
            name: 'Total Bookings',
            value: stats.totalBookings,
            icon: Calendar,
            change: '+54.02%',
            changeType: 'positive',
        },
        {
            name: 'Active Vehicles',
            value: stats.activeVehicles,
            icon: Car,
            change: '-1.39%',
            changeType: 'negative',
        },
        {
            name: 'Total Users',
            value: stats.totalUsers,
            icon: Users,
            change: '+10.18%',
            changeType: 'positive',
        },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {cards.map((card) => (
                    <div
                        key={card.name}
                        className="rounded-xl border bg-white p-6 shadow-sm"
                    >
                        <div className="flex items-center justify-between space-y-0 pb-2">
                            <p className="text-sm font-medium text-gray-500">{card.name}</p>
                            <card.icon className="h-4 w-4 text-gray-400" />
                        </div>
                        <div className="flex items-center pt-4">
                            <div className="text-2xl font-bold">{card.value}</div>
                            <div className={`ml-auto flex items-baseline text-sm font-semibold ${card.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                {card.changeType === 'positive' ? (
                                    <ArrowUpRight className="h-4 w-4 mr-1 self-center" />
                                ) : (
                                    <ArrowDownRight className="h-4 w-4 mr-1 self-center" />
                                )}
                                {card.change}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
