const { check, validationResult } = require('express-validator');

exports.validateAdminLogIn = [
  check('username')
    .custom((value) => {
      const username = process.env.ADMIN_USER;
      if (value !== username) throw new Error('wrong username or password');
      return true;
    })
    .withMessage('user name error'),
  check('password').custom((value) => {
    const password = process.env.ADMIN_PASSWORD;
    if (value !== password) throw new Error('wrong username or password');
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(401).json({ errors: errors.array() });

    next();
  },
];
