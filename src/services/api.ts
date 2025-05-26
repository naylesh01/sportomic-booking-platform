import axios from 'axios';
import type { Venue, Slot, Booking } from '@/types';

const API_URL = 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const apiService = {
  // Auth endpoints
  async login(email: string, password: string): Promise<{ token: string; user: any }> {
    try {
      const response = await apiClient.post('/users/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      return { token, user };
    } catch (error: any) {
      console.error('Error logging in:', error);
      throw new Error(error.response?.data?.message || 'Failed to login');
    }
  },

  async register(name: string, email: string, password: string): Promise<{ token: string; user: any }> {
    try {
      const response = await apiClient.post('/users/register', { name, email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      return { token, user };
    } catch (error: any) {
      console.error('Error registering:', error);
      throw new Error(error.response?.data?.message || 'Failed to register');
    }
  },

  async logout() {
    localStorage.removeItem('token');
  },

  // Venue endpoints
  async getVenues(): Promise<Venue[]> {
    try {
      const response = await apiClient.get('/venues');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching venues:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch venues');
    }
  },

  async getVenueById(id: string) {
    try {
      const response = await apiClient.get(`/venues/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching venue:', error);
      throw new Error('Failed to fetch venue');
    }
  },

  async getSlots(venueId: string, date: string, sport?: string): Promise<Slot[]> {
    try {
      const params = new URLSearchParams();
      if (date) params.append('date', date);
      if (sport) params.append('sport', sport);
      
      params.append('venueId', venueId);
      const url = `/slots?${params.toString()}`;
      const response = await apiClient.get(url);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching slots:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch slots');
    }
  },

  // Booking endpoints
  async createBooking(booking: Omit<Booking, 'id'>): Promise<Booking> {
    try {
      // Create the booking with a generated ID
      const bookingData = {
        ...booking,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      
      // Create the booking first
      const response = await apiClient.post('/bookings', bookingData);
      
      // If booking is successful, mark the slot as booked
      await apiClient.patch(`/slots/${booking.slotId}`, { booked: true });
      
      return response.data;
    } catch (error: any) {
      console.error('Error creating booking:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch bookings');
    }
  },

  async getBookings(): Promise<Booking[]> {
    try {
      const response = await apiClient.get('/bookings');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching bookings:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch bookings');
    }
  },

  async markSlotAsBooked(slotId: string): Promise<void> {
    try {
      await apiClient.put(`/slots/${slotId}`, {
        booked: true
      });
    } catch (error) {
      console.error('Error marking slot as booked:', error);
      throw new Error('Failed to mark slot as booked');
    }
  }
};
