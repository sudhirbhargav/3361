const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'], // Email validation regex
  },
  name: {
    type: String,
    required: true,
    minlength: [3, 'Name must be at least 3 characters long'],
  },
  message: {
    type: String,
    required: true,
    maxlength: [500, 'Message cannot exceed 500 characters'],
  },
  number: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Please provide a valid 10-digit phone number'], // Phone number validation (adjust regex as needed)
  },
  subject: {
    type: String,
    required: true,
    maxlength: [100, 'Subject cannot exceed 100 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Query = mongoose.model('Query', querySchema);
module.exports = Query;
