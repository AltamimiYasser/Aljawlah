const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  idNumber: {
    type: String,
  },
  sex: {
    type: String,
  },
});

module.exports = mongoose.model('customer', customerSchema);
