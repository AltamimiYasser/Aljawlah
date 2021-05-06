const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  barcode: {
    type: String,
  },
  color: {
    type: String,
  },
  wheels: {
    type: Number,
  },
  billNumber: {
    type: String,
  },
  dateOfPurchase: {
    type: Date,
  },
  model: {
    type: String,
  },
  rentPrice: {
    type: Number,
    default: 10,
  },
  size: {
    type: Number,
  },
  plate: {
    type: String,
  },
  bikeClass: {
    type: String,
  },
  workingHours: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model('bike', bikeSchema);
