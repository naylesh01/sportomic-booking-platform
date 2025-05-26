module.exports = (req, res, next) => {
  // Add CORS headers
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

  // Handle bookings
  if (req.method === 'POST' && req.path === '/bookings') {
    // Add an ID to the booking
    req.body.id = Date.now().toString();
    
    // Get the current db state
    const db = req.app.db;
    
    // Find and update the slot
    const slots = db.get('slots').value();
    const slot = slots.find(s => s.id === req.body.slotId);
    
    if (slot) {
      // Check if slot is already booked
      if (slot.booked) {
        res.status(400).json({ message: 'This slot is already booked' });
        return;
      }
      
      // Mark slot as booked
      db.get('slots')
        .find({ id: req.body.slotId })
        .assign({ booked: true })
        .write();
    }
  }

  // Handle slots filtering
  if (req.method === 'GET' && req.path.includes('/slots')) {
    const { venueId, date } = req.query;
    if (venueId) {
      req.query.venueId = venueId;
    }
    if (date) {
      req.query.date = date;
    }
  }

  next();
};
