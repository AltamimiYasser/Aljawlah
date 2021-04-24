const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const User = require('../models/User');

exports.validateRegister = [
  check('email', 'Invalid Email')
    .isEmail()

    // custom to check if email exists in database
    .custom(async (value) => {
      const existingEmail = await User.findOne({ email: value });
      if (existingEmail) return Promise.reject('Email already exists');
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
  check('email').custom(async (value) => {
    const existingEmail = await User.findOne({ email: value });
    if (!existingEmail) return Promise.reject('wrong email or password');
  }),

  // check if password matches
  check('password').custom(async (value, { req }) => {
    if (!value) return Promise.reject('wrong email or password');

    // get user
    const user = await User.findOne({ email: req.body.email });

    // compare the passwords
    const match = bcrypt.compare(value, user.password);

    // error if not match
    if (!match) return Promise.reject('wrong email or password');
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    next();
  },
];
