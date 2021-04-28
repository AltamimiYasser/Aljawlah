const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const User = require('../models/User');

exports.validateRegister = [
  check('username')
    // custom to check if email exists in database
    .custom(async (value) => {
      const existingUsername = await User.findOne({ username: value });
      if (existingUsername) return Promise.reject('Username already exists');
      return true;
    }),

  check('password', 'password must be at least 6 characters long').isLength({
    min: 6,
  }),

  // here we throw the errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    // no errors? next
    next();
  },
];

exports.validateSignIn = [
  // check if email exists in database
  check('username').custom(async (value) => {
    const existingUsername = await User.findOne({ username: value });
    if (!existingUsername) return Promise.reject('wrong username or password');
  }),

  // check if password matches
  check('password').custom(async (value, { req }) => {
    if (!value) return Promise.reject('wrong username or password');

    // get user
    const user = await User.findOne({ username: req.body.username });

    // compare the passwords
    const match = bcrypt.compare(value, user.password);

    // error if not match
    if (!match) return Promise.reject('wrong username or password');
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    next();
  },
];
