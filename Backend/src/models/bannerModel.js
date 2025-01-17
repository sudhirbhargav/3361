const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema(
  {
    images: {
      type: [String], 
      validate: {
        validator: function (v) {
          return v.length <= 4; 
        },
        message: 'You can upload a maximum of 4 banners.',
      },
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Banner', bannerSchema);
