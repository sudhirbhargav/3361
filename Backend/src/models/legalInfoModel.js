const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const legalInfoSchema = new Schema({
  title: {
    type: String,
    enum: ["about us", "terms", "privacy"],
    required: true,
  },
  content: {
    type: String,
    required: true, 
  },
  lastUpdated: {
    type: Date,
    default: Date.now, 
  },
});

const LegalInfo = mongoose.model('LegalInfo', legalInfoSchema);
module.exports = LegalInfo;
