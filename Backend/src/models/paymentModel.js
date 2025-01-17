const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
    },
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle", 
    },
    totalAmount: {
      type: Number, 
      required: true,
      min: 0, 
    },
    transactionId: {
      type: String,
      unique: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'canceled'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['paytm', 'credit_card', 'debit_card', 'net_banking'],
      required: true, 
    },
    qrCode: {
      type: String, 
      required: false,
    }
  },
  {
    timestamps: true, 
  }
);

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
