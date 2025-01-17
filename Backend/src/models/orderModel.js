const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  tripId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
  },
  riderIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending',
  },
  orderStatus: {
    type: String,
    enum: ['Active', 'Completed', 'Cancelled'],
    default: 'Active',
  },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
