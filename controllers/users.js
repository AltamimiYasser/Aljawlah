const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// register user
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const newUser = new User({ username, password: hashedPassword });

    // save user
    const savedUser = await newUser.save();

    // return 200 ok
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: [{ msg: 'Server error' }] });
  }
};

// sign user in
exports.singIn = async (req, res) => {
  try {
    // get user
    const user = await User.findOne({ username: req.body.username });

    // create token
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);

    // return it
    res.cookie('token', token, { httpOnly: true }).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: [{ msg: 'Server error' }] });
  }
};

// log user out
exports.logout = (req, res) => {
  // send empty cookie with an already expired date
  res.cookie('token', '', { expires: new Date(0), httpOnly: true }).send();
};

// is loggedin return true if valid token and false other wise
exports.isLoggedIn = (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);
    // this will throw an error that we catch in catch block and return false
    jwt.verify(token, process.env.TOKEN_SECRET);

    // passed all? return true
    res.json(true);
  } catch (err) {
    res.json(false);
  }
};
