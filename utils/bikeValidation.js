const { check, validationResult } = require('express-validator');

exports.validateNewBike = [
  check('color', 'color is required').not().isEmpty(),
  check('wheels', 'wheels is required').not().isEmpty(),
  check('size', 'size is required').not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    next();
  },
];
