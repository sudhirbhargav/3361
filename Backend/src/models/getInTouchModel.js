const mongoose = require('mongoose');

const getInTouchSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  twitter: {
    type: String,
    required: false,
  },
  facebook: {
    type: String,
    required: false,
  },
  instagram: {
    type: String,
    required: false,
  },
}, {
  timestamps: true, 
});

const GetInTouch = mongoose.model('GetInTouch', getInTouchSchema);

module.exports = GetInTouch;
