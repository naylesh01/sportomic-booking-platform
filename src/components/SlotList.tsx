
import { Button } from '@/components/ui/button';
import { Clock, DollarSign, Play } from 'lucide-react';
import type { Slot } from '@/types';

interface SlotListProps {
  slots: Slot[];
  onSlotSelect: (slot: Slot) => void;
  loading: boolean;
  selectedVenue: string;
  selectedDate: Date | undefined;
}

export const SlotList = ({ slots, onSlotSelect, loading, selectedVenue, selectedDate }: SlotListProps) => {
  if (!selectedVenue || !selectedDate) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 animate-pulse">
        <Clock className="w-16 h-16 text-gray-400 mx-auto mb-6 animate-bounce" />
        <h3 className="text-xl font-semibold text-gray-700 mb-3">
          Ready to Book Your Slot?
        </h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Start by selecting your preferred venue and date to explore available time slots
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="relative mx-auto w-16 h-16 mb-6">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-emerald-200 rounded-full animate-ping"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-emerald-600 rounded-full animate-spin"></div>
        </div>
        <p className="text-lg text-gray-600 animate-pulse">Finding the perfect slots for you...</p>
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
        <div className="mx-auto w-16 h-16 mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <Clock className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-3">
          No Slots Available
        </h3>
        <p className="text-gray-500 max-w-md mx-auto mb-4">
          We couldn't find any available slots for the selected date and venue
        </p>
        <div className="flex gap-4 justify-center text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Try another date
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            Check different venue
          </span>
        </div>
      </div>
    );
  }

  const groupedSlots = slots.reduce((acc, slot) => {
    if (!acc[slot.sport]) {
      acc[slot.sport] = [];
    }
    acc[slot.sport].push(slot);
    return acc;
  }, {} as Record<string, Slot[]>);

  return (
    <div className="space-y-8">
      {Object.entries(groupedSlots).map(([sport, sportSlots]) => (
        <div key={sport} className="space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-light/20 flex items-center justify-center animate-pulse-scale">
                <Play className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{sport}</h3>
                <p className="text-sm text-gray-500">{sportSlots.length} time slots available</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sportSlots.map((slot, index) => (
              <div
                key={slot.id}
                className="group border rounded-xl p-5 bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:border-primary-light"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-light/10 flex items-center justify-center group-hover:bg-primary-light/20 transition-colors">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">{slot.time}</span>
                      <p className="text-sm text-gray-500">Duration: 1 hour</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-green-600 font-bold text-lg">
                      <DollarSign className="w-5 h-5" />
                      <span>{slot.price}</span>
                    </div>
                    <span className="text-xs text-gray-400">per session</span>
                  </div>
                </div>
                
                <Button
                  onClick={() => onSlotSelect(slot)}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-semibold shadow-md group-hover:shadow-xl transition-all duration-300 animate-pulse-scale"
                  size="lg"
                >
                  Book This Slot
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
