const { check, validationResult } = require('express-validator');

exports.validateNewCustomer = [
  check('fName', 'First name is required').not().isEmpty().isString(),
  check('phone').not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    next();
  },
];
