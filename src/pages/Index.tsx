
import { useState, useEffect } from 'react';
import { VenueSelector } from '@/components/VenueSelector';
import { DatePicker } from '@/components/DatePicker';
import { SlotList } from '@/components/SlotList';
import { BookingForm } from '@/components/BookingForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { apiService } from '@/services/api';
import type { Venue, Slot, Booking } from '@/types';

const Index = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [selectedVenue, setSelectedVenue] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [loading, setLoading] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Fetch venues on component mount
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await apiService.getVenues();
        setVenues(response);
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to load venues",
          variant: "destructive"
        });
      }
    };
    fetchVenues();
  }, []);

  // Fetch slots when venue or date changes
  useEffect(() => {
    const fetchSlots = async () => {
      if (!selectedVenue || !selectedDate) return;
      
      setLoading(true);
      try {
        const slots = await apiService.getSlots(selectedVenue, selectedDate.toISOString().split('T')[0]);
        setAvailableSlots(slots);
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to load available slots",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [selectedVenue, selectedDate]);

  // Auto-refresh slots every 5 seconds for real-time experience
  useEffect(() => {
    if (!selectedVenue || !selectedDate) return;

    const interval = setInterval(async () => {
      try {
        const slots = await apiService.getSlots(selectedVenue, selectedDate.toISOString().split('T')[0]);
        setAvailableSlots(slots);
      } catch (error) {
        console.error('Auto-refresh failed:', error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedVenue, selectedDate]);

  const handleSlotSelect = (slot: Slot) => {
    setSelectedSlot(slot);
    setShowBookingForm(true);
  };

  const handleBookingSubmit = async (bookingData: Omit<Booking, 'id'>) => {
    if (!selectedSlot) return;

    try {
      setLoading(true);
      
      // Create booking
      await apiService.createBooking({
        ...bookingData,
        slotId: selectedSlot.id,
        venueId: selectedVenue,
        date: selectedDate!.toISOString().split('T')[0],
        timeSlot: selectedSlot.time,
        sport: selectedSlot.sport
      });

      // Refresh slots
      const updatedSlots = await apiService.getSlots(selectedVenue, selectedDate!.toISOString().split('T')[0]);
      setAvailableSlots(updatedSlots);

      toast({
        title: "Booking Confirmed!",
        description: `Your slot at ${bookingData.sport} has been booked successfully.`
      });

      setShowBookingForm(false);
      setSelectedSlot(null);
    } catch (error: any) {
      console.error('Booking error:', error);
      toast({
        title: "Booking Failed",
        description: error.response?.data?.message || error.message || "Failed to create booking. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 transition-all duration-500 bg-cover bg-center bg-fixed font-sans" style={{ backgroundImage: 'url("/background.jpg")' }}>
      <div className="max-w-7xl mx-auto backdrop-blur-sm bg-white/90 p-8 rounded-2xl shadow-2xl animate-fade-in">
        {/* Hero Section */}
        <div className="text-center mb-12 space-y-4 animate-fadeIn">
          <h1 className="text-6xl font-extrabold text-gray-900 mb-4 tracking-tight font-display animate-pulse-scale">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-pulse-scale">
              Sportomic
            </span>
            <span className="block text-3xl mt-2 bg-clip-text text-transparent bg-gradient-to-r from-primary-dark to-secondary-dark">Sports Venue Booking</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
            Book premium sports venues instantly. Your game, your time, your way.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-slideUp">
          {/* Selection Panel */}
          <div className="lg:col-span-1 space-y-6 sticky top-4 self-start">
            <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-primary transform hover:-translate-y-1">
              <CardHeader className="space-y-2">
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <svg className="w-6 h-6 text-primary animate-pulse-scale" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Select Venue & Date
                </CardTitle>
                <p className="text-gray-500 text-sm">Choose your preferred venue and booking date</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <VenueSelector
                  venues={venues}
                  selectedVenue={selectedVenue}
                  onVenueChange={setSelectedVenue}
                />
                <DatePicker
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                />
              </CardContent>
            </Card>

            {showBookingForm && selectedSlot && (
              <Card>
                <CardHeader>
                  <CardTitle>Complete Your Booking</CardTitle>
                </CardHeader>
                <CardContent>
                  <BookingForm
                    slot={selectedSlot}
                    venue={venues.find(v => v.id === selectedVenue)?.name || ''}
                    date={selectedDate!}
                    onSubmit={handleBookingSubmit}
                    onCancel={() => {
                      setShowBookingForm(false);
                      setSelectedSlot(null);
                    }}
                    loading={loading}
                  />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Slots Panel */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-secondary transform hover:-translate-y-1">
              <CardHeader className="space-y-2">
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Available Time Slots
                </CardTitle>
                <p className="text-gray-500 text-sm">Select your preferred time slot</p>
              </CardHeader>
              <CardContent>
                <SlotList
                  slots={availableSlots}
                  onSlotSelect={handleSlotSelect}
                  loading={loading}
                  selectedVenue={selectedVenue}
                  selectedDate={selectedDate}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
