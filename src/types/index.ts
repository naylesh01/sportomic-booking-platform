
export interface Venue {
  id: string;
  name: string;
  location: string;
  sports: string[];
}

export interface Slot {
  id: string;
  venueId: string;
  time: string;
  sport: string;
  price: number;
  booked: boolean;
  date: string;
}

export interface Booking {
  id: string;
  userName: string;
  sport: string;
  date: string;
  timeSlot: string;
  slotId: string;
  venueId: string;
  createdAt: string;
}
