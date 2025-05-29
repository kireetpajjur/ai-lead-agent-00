const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  zip: String,
  issue: String,
  datetime: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);
