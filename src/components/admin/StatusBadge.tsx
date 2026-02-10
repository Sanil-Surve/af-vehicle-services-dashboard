import { BookingStatus } from '@/types/booking';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
    status: BookingStatus;
    className?: string;
}

const statusStyles: Record<BookingStatus, string> = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    confirmed: 'bg-green-100 text-green-800 border-green-200',
    completed: 'bg-blue-100 text-blue-800 border-blue-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
    return (
        <span
            className={cn(
                'px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize',
                statusStyles[status],
                className
            )}
        >
            {status}
        </span>
    );
}
