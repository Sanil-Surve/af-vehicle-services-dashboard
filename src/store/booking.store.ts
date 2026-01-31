import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Vehicle } from '@/types/vehicle';

interface BookingState {
  selectedVehicle: Vehicle | null;
  dates: { from: Date | undefined; to: Date | undefined };
  selectVehicle: (vehicle: Vehicle) => void;
  setDates: (dates: { from: Date | undefined; to: Date | undefined }) => void;
  clearBooking: () => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      selectedVehicle: null,
      dates: { from: undefined, to: undefined },
      selectVehicle: (vehicle) => set({ selectedVehicle: vehicle }),
      setDates: (dates) => set({ dates }),
      clearBooking: () => set({ selectedVehicle: null, dates: { from: undefined, to: undefined } }),
    }),
    {
      name: 'booking-storage',
    }
  )
);
