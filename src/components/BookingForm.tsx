
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { User, Play, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import type { Slot, Booking } from '@/types';

interface BookingFormProps {
  slot: Slot;
  venue: string;
  date: Date;
  onSubmit: (booking: Omit<Booking, 'id'>) => void;
  onCancel: () => void;
  loading: boolean;
}

export const BookingForm = ({ slot, venue, date, onSubmit, onCancel, loading }: BookingFormProps) => {
  const [userName, setUserName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) return;

    onSubmit({
      userName: userName.trim(),
      sport: slot.sport,
      date: date.toISOString().split('T')[0],
      timeSlot: slot.time,
      slotId: slot.id,
      venueId: slot.venueId,
      createdAt: new Date().toISOString()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Booking Summary */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-3">Booking Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-blue-800">
            <Play className="w-4 h-4" />
            <span>Sport: {slot.sport}</span>
          </div>
          <div className="flex items-center gap-2 text-blue-800">
            <Calendar className="w-4 h-4" />
            <span>Date: {format(date, 'PPP')}</span>
          </div>
          <div className="flex items-center gap-2 text-blue-800">
            <Clock className="w-4 h-4" />
            <span>Time: {slot.time}</span>
          </div>
          <div className="flex items-center gap-2 text-blue-800">
            <span>Venue: {venue}</span>
          </div>
          <div className="flex items-center gap-2 text-green-700 font-semibold">
            <span>Price: ${slot.price}</span>
          </div>
        </div>
      </Card>

      {/* User Details */}
      <div className="space-y-2">
        <Label htmlFor="userName" className="flex items-center gap-2">
          <User className="w-4 h-4" />
          Your Name
        </Label>
        <Input
          id="userName"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your full name"
          required
          disabled={loading}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!userName.trim() || loading}
          className="flex-1"
        >
          {loading ? 'Booking...' : 'Confirm Booking'}
        </Button>
      </div>
    </form>
  );
};
