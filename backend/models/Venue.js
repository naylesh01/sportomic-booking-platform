const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  sports: [{
    type: String,
    required: true
  }],
  amenities: [{
    type: String
  }],
  rating: {
    type: Number,
    default: 0
  },
  operatingHours: {
    open: String,
    close: String
  },
  contactInfo: {
    phone: String,
    email: String
  },
  images: [String]
}, { timestamps: true });

module.exports = mongoose.model('Venue', venueSchema);
