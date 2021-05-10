const { check, validationResult } = require('express-validator');
const Customer = require('../models/Customer');
const Bike = require('../models/Bike');
const mongoose = require('mongoose');

exports.validateNewRent = [
  check('customer', 'Customer is required')
    .not()
    .isEmpty()
    .custom(async (value) => {
      // make sure it's a correct id
      if (!mongoose.Types.ObjectId.isValid(value))
        return promise.reject('invalid user Id');

      // make sure customer exists
      const existingCustomer = await Customer.findById(value);
      if (!existingCustomer) return promise.reject("Customer doesn't exist");
      return true;
    }),
  check('bikes', 'You must add at least one bike').isArray({ min: 1 }),
  check('bikes.*', 'Invalid Id').custom(async (value) => {
    // make sure it's a valid id
    if (!mongoose.Types.ObjectId.isValid(value))
      return Promise.reject('invalid bike Id');

    // make sure it exists
    const existingBike = await Bike.findById(value);
    if (!existingBike) return Promise.reject('make sure all bikes exist');
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    next();
  },
];
