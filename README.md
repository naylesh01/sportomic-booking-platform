# Sportomic Slot Booking System

A comprehensive sports facility management system built with React and TypeScript. Designed to streamline the booking process for sports venues, enabling users to discover and reserve facilities efficiently.

## Key Features

- **Smart Venue Discovery**: Browse and filter venues by location, sport type and available amenities
- **Real-time Availability**: Live updates of slot availability with automatic refresh
- **Seamless Booking Flow**: Intuitive three-step booking process with instant confirmation
- **Responsive Interface**: Optimized for all devices with touch-friendly controls
- **Venue Details**: Rich venue information including amenities, ratings and sports offered
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

## Usage Guide steps 

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

```plaintext
sportomic-slot-reserve/
├── src/                    # Source code directory
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   │   ├── Button/    # Button components and variants
│   │   │   ├── Input/     # Form input components
│   │   │   ├── Select/    # Dropdown components
│   │   │   └── Card/      # Card layout components
│   │   ├── layout/        # Layout components
│   │   │   ├── Header/    # Application header
│   │   │   └── Footer/    # Application footer
│   │   ├── VenueSelector/ # Venue selection component
│   │   ├── SlotList/      # Time slot display component
│   │   └── BookingForm/   # Booking form component
│   ├── pages/             # Page components
│   │   ├── Home/          # Home page
│   │   ├── Venues/        # Venue listing page
│   │   └── Booking/       # Booking page
│   ├── hooks/             # Custom React hooks
│   │   ├── useVenues.ts   # Venue data management
│   │   ├── useSlots.ts    # Slot data management
│   │   └── useBooking.ts  # Booking logic
│   ├── services/          # API and external services
│   │   ├── api/           # API client setup
│   │   │   ├── client.ts  # Axios instance
│   │   │   └── routes.ts  # API endpoints
│   │   └── booking/       # Booking service
│   ├── types/             # TypeScript type definitions
│   │   ├── venue.ts       # Venue-related types
│   │   ├── slot.ts        # Slot-related types
│   │   └── booking.ts     # Booking-related types
│   ├── utils/             # Utility functions
│   │   ├── date.ts        # Date formatting utilities
│   │   ├── validation.ts  # Form validation helpers
│   │   └── format.ts      # Data formatting helpers
│   ├── styles/            # Global styles
│   │   ├── globals.css    # Global CSS
│   │   └── themes/        # Theme configurations
│   └── config/            # App configuration
│       ├── constants.ts   # App constants
│       └── env.ts         # Environment variables
├── public/               # Static assets
│   ├── images/           # Image assets
│   ├── icons/            # Icon assets
│   └── fonts/            # Font files
├── tests/                # Test files
│   ├── unit/             # Unit tests
│   ├── integration/      # Integration tests
│   └── e2e/              # End-to-end tests
├── scripts/              # Build and utility scripts
├── docs/                 # Documentation
│   ├── api/              # API documentation
│   └── setup/            # Setup guides
├── .github/              # GitHub configuration
│   └── workflows/        # GitHub Actions
├── db.json              # JSON Server database
├── package.json         # Project dependencies
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── .env.example         # Example environment variables
├── .eslintrc.js        # ESLint configuration
├── .prettierrc         # Prettier configuration
└── README.md           # Project documentation
```

This structure follows a modular and scalable architecture that separates concerns and makes the codebase maintainable and easy to navigate.

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
