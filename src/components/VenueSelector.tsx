
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin } from 'lucide-react';
import type { Venue } from '@/types';

interface VenueSelectorProps {
  venues: Venue[];
  selectedVenue: string;
  onVenueChange: (venueId: string) => void;
}

export const VenueSelector = ({ venues, selectedVenue, onVenueChange }: VenueSelectorProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
        <MapPin className="w-4 h-4" />
        Select Venue
      </label>
      <Select value={selectedVenue} onValueChange={onVenueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose a venue..." />
        </SelectTrigger>
        <SelectContent>
          {venues.map((venue) => (
            <SelectItem key={venue.id} value={venue.id}>
              <div className="flex flex-col">
                <span className="font-medium">{venue.name}</span>
                <span className="text-xs text-gray-500">{venue.location}</span>
                <span className="text-xs text-emerald-600">
                  Sports: {venue.sports.join(', ')}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
