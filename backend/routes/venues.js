const express = require('express');
const router = express.Router();
const Venue = require('../models/Venue');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Get all venues
router.get('/', async (req, res) => {
  try {
    const venues = await Venue.find();
    res.json(venues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single venue
router.get('/:id', async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) return res.status(404).json({ message: 'Venue not found' });
    res.json(venue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create venue (Admin only)
router.post('/', [auth, admin], async (req, res) => {
  try {
    const venue = new Venue(req.body);
    const savedVenue = await venue.save();
    res.status(201).json(savedVenue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update venue (Admin only)
router.put('/:id', [auth, admin], async (req, res) => {
  try {
    const venue = await Venue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(venue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete venue (Admin only)
router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    await Venue.findByIdAndDelete(req.params.id);
    res.json({ message: 'Venue deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
