const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data store
const db = {
  venues: [
    {
      id: '1',
      name: 'Elite Sports Complex',
      location: '123 Park Avenue, Downtown',
      sports: ['Tennis', 'Badminton', 'Squash'],
      amenities: ['Changing Rooms', 'Pro Shop', 'Parking'],
      rating: 4.5,
      slots: [
        { id: '1', sport: 'Tennis', time: '09:00', duration: 60, price: 1000, venueId: '1' },
        { id: '2', sport: 'Tennis', time: '10:00', duration: 60, price: 1000, venueId: '1' },
        { id: '3', sport: 'Badminton', time: '09:00', duration: 60, price: 800, venueId: '1' },
        { id: '4', sport: 'Badminton', time: '10:00', duration: 60, price: 800, venueId: '1' },
        { id: '5', sport: 'Squash', time: '09:00', duration: 60, price: 600, venueId: '1' },
        { id: '6', sport: 'Squash', time: '10:00', duration: 60, price: 600, venueId: '1' }
      ]
    },
    {
      id: '2',
      name: 'Fitness Arena',
      location: '45 North Sports Lane',
      sports: ['Basketball', 'Volleyball', 'Table Tennis'],
      amenities: ['Locker Room', 'Cafeteria', 'First Aid'],
      rating: 4.2,
      slots: [
        { id: '7', sport: 'Basketball', time: '09:00', duration: 60, price: 1200, venueId: '2' },
        { id: '8', sport: 'Basketball', time: '10:00', duration: 60, price: 1200, venueId: '2' },
        { id: '9', sport: 'Volleyball', time: '09:00', duration: 60, price: 1000, venueId: '2' },
        { id: '10', sport: 'Volleyball', time: '10:00', duration: 60, price: 1000, venueId: '2' },
        { id: '11', sport: 'Table Tennis', time: '09:00', duration: 60, price: 500, venueId: '2' },
        { id: '12', sport: 'Table Tennis', time: '10:00', duration: 60, price: 500, venueId: '2' }
      ]
    }
  ],
  users: [],
  bookings: []
};

// Auth middleware
const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'your-secret-key');
    const user = db.users.find(u => u.id === decoded.userId);
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

// Venue routes
app.get('/api/venues', (req, res) => {
  res.json(db.venues);
});

app.get('/api/venues/:id', (req, res) => {
  const venue = db.venues.find(v => v.id === req.params.id);
  if (!venue) return res.status(404).json({ message: 'Venue not found' });
  res.json(venue);
});

// Slots routes
app.get('/api/venues/:id/slots', (req, res) => {
  const { id } = req.params;
  const { date, sport } = req.query;
  
  const venue = db.venues.find(v => v.id === id);
  if (!venue) return res.status(404).json({ message: 'Venue not found' });

  // Get all slots for the venue
  let slots = venue.slots;

  // Filter by sport if specified
  if (sport) {
    slots = slots.filter(slot => slot.sport === sport);
  }

  // Check which slots are already booked for the given date
  if (date) {
    const bookedSlots = db.bookings.filter(b => 
      b.venueId === id && 
      b.date === date && 
      b.status === 'confirmed'
    ).map(b => b.slotId);

    // Mark slots as available or booked
    slots = slots.map(slot => ({
      ...slot,
      isAvailable: !bookedSlots.includes(slot.id)
    }));
  }

  res.json(slots);
});

// Booking routes
app.post('/api/bookings', async (req, res) => {
  try {
    const { userName, sport, date, timeSlot, slotId, venueId } = req.body;
    
    // Validate required fields
    if (!userName || !sport || !date || !timeSlot || !slotId || !venueId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if slot exists and is available
    const venue = db.venues.find(v => v.id === venueId);
    if (!venue) {
      return res.status(404).json({ message: 'Venue not found' });
    }

    const slot = venue.slots.find(s => s.id === slotId);
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    // Check if slot is already booked
    const isBooked = db.bookings.some(b => 
      b.slotId === slotId && 
      b.date === date && 
      b.status === 'confirmed'
    );

    if (isBooked) {
      return res.status(400).json({ message: 'Slot already booked' });
    }

    // Create booking
    const booking = {
      id: Date.now().toString(),
      userName,
      sport,
      date,
      timeSlot,
      slotId,
      venueId,
      status: 'confirmed',
      amount: slot.price,
      createdAt: new Date().toISOString()
    };

    db.bookings.push(booking);
    res.status(201).json(booking);
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Failed to create booking' });
  }
});

app.get('/api/bookings/my-bookings', auth, (req, res) => {
  const userBookings = db.bookings.filter(b => b.userId === req.user.id);
  res.json(userBookings);
});

// User routes
app.post('/api/users/register', (req, res) => {
  const { email, password, name } = req.body;
  if (db.users.some(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  
  const user = {
    id: Date.now().toString(),
    email,
    password, // In production, hash the password
    name
  };
  
  db.users.push(user);
  const token = jwt.sign({ userId: user.id }, 'your-secret-key');
  res.status(201).json({ token, user: { id: user.id, email, name } });
});

app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  const token = jwt.sign({ userId: user.id }, 'your-secret-key');
  res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
