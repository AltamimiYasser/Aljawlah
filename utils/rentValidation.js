const { check, validationResult } = require('express-validator');

exports.validateNewRent = [
  check('customer', 'Customer is required').not().isEmpty(),
  check('bikes', 'You must add at least one bike').isArray({ min: 1 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    next();
  },
];
