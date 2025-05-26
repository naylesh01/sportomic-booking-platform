
# Sportomic Slot Booking System

A comprehensive sports facility management system built with React and TypeScript. Designed to streamline the booking process for sports venues, enabling users to discover and reserve facilities efficiently.

## Key Features

- **Smart Venue Discovery**: Browse and filter venues by location, sport type, and available amenities
- **Real-time Availability**: Live updates of slot availability with automatic refresh
- **Seamless Booking Flow**: Intuitive three-step booking process with instant confirmation
- **Responsive Interface**: Optimized for all devices with touch-friendly controls
- **Venue Details**: Rich venue information including amenities, ratings, and sports offered
- **Instant Notifications**: Booking confirmations and status updates via toast messages

## Technical Architecture

### Frontend Architecture
- **Component Structure**:
  - `VenueSelector`: Advanced dropdown with search and filtering
  - `DatePicker`: Custom calendar with availability indicators
  - `SlotList`: Dynamic grid system with real-time updates
  - `BookingForm`: Multi-step form with validation

### State Management
- React Query for server state
- Context API for application state
- Local state for component-level UI

### Backend Architecture
- **REST API Layer**: JSON Server implementation
- **Data Models**:
  - Venues with amenities and ratings
  - Time slots with availability tracking
  - Bookings with user details and status
- **Persistence**: JSON-based storage with automatic updates

## Development Setup

### Prerequisites
- Node.js (v16.14.0 or higher)
- npm (v7.24.0 or higher) or Yarn (v1.22.0 or higher)
- Git for version control

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/your-username/sportomic-slot-reserve.git
cd sportomic-slot-reserve
```

2. Install project dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

### Backend Setup

1. Install JSON Server globally:
```bash
npm install -g json-server
```

2. Start the JSON Server (in a separate terminal):
```bash
json-server --watch db.json --port 5000
```

3. Verify backend is running by visiting: `http://localhost:5000`

### Full Application

1. Make sure both frontend (port 5173) and backend (port 5000) are running
2. Open your browser and navigate to `http://localhost:5173`

## API Reference

- `GET /venues` → Get all venues
- `GET /slots?venueId=1&date=2025-05-26&booked=false` → Get available slots
- `POST /bookings` → Create a new booking
- `PATCH /slots/:id` → Mark slot as booked

## Usage Guide

1. **Select a Venue**: Choose from the dropdown list of available sports venues
2. **Pick a Date**: Use the date picker to select your preferred booking date
3. **Browse Slots**: View available time slots organized by sport type
4. **Book a Slot**: Click on any available slot and fill in your details
5. **Confirm Booking**: Submit the form to complete your reservation

## Technology Stack

### Frontend
- **Core**: React 18.2.0 with TypeScript 5.0
- **UI Framework**: 
  - Shadcn/ui (custom components)
  - Radix UI primitives for accessibility
  - Tailwind CSS for styling
- **State Management**:
  - React Query 4.0 for server state
  - Context API for global state
  - React hooks for local state

### Development Tools
- **Build System**: Vite 4.4.0
- **Package Manager**: npm/yarn
- **Code Quality**:
  - ESLint for linting
  - Prettier for code formatting
  - TypeScript for type safety

### Backend & Data
- **API Server**: JSON Server
- **Data Storage**: JSON-based persistence
- **HTTP Client**: Axios with interceptors

## Core Features

### Real-time Experience
- HTTP calls to JSON Server backend
- Immediate slot removal after booking
- Loading states for better UX

### Responsive Design
- Mobile-first approach
- Grid layouts that adapt to screen size
- Touch-friendly interface

### User Experience
- Intuitive booking flow
- Clear visual feedback
- Error handling with toast notifications

## Development Guide

### Project Structure
```
src/
├── components/           # React components
│   ├── ui/              # UI components (buttons, inputs, etc.)
│   ├── VenueSelector.tsx
│   ├── DatePicker.tsx
│   ├── SlotList.tsx
│   └── BookingForm.tsx
├── services/            # API services
│   └── api.ts
├── types/               # TypeScript type definitions
│   └── index.ts
├── pages/               # Page components
│   └── Index.tsx
├── lib/                 # Utility functions
│   └── utils.ts
db.json                  # JSON Server database
backend-setup.md         # Backend setup instructions
```

### Backend Data Structure
The `db.json` file contains:
- **venues**: Sports venues with locations and available sports
- **slots**: Time slots with pricing and availability status
- **bookings**: User bookings with complete details

## Deployment Instructions

### Frontend Deployment
1. **Vercel** (Recommended):
   ```bash
   npm run build
   # Deploy to Vercel
   ```

2. **Netlify**:
   ```bash
   npm run build
   # Deploy dist/ folder to Netlify
   ```

### Backend Options for Production
- **Heroku**: Deploy JSON Server to Heroku
- **Railway**: Simple JSON Server deployment
- **Custom API**: Replace with Node.js/Express + real database

## 🔮 Future Enhancements

- [ ] User authentication and profiles
- [ ] Payment integration
- [ ] Email confirmations
- [ ] Admin dashboard for venue management
- [ ] Mobile app (React Native)
- [ ] WebSocket for real-time updates
- [ ] Booking history and management
- [ ] Venue reviews and ratings

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes with a descriptive message
4. Push to your feature branch
5. Create a pull request with a clear description of the changes

## Support & Issues

If you encounter any issues or have questions:
1. Check the [existing issues](../../issues) first
2. If your issue isn't listed, create a new one with:
   - Steps to reproduce
   - Expected behavior
   - Current behavior
   - Environment details

---

Developed for Sportomic © 2025
