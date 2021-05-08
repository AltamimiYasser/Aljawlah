const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { use } = require('../routes/bikes');

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
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// sign user in
exports.singIn = async (req, res) => {
  try {
    // get user
    const user = await User.findOne({ username: req.body.username });

    // create token
    const token = jwt.sign({ user: user._id }, process.env.TOKEN_SECRET);

    // return it
    res.cookie('token', token, { httpOnly: true, sameSite: 'strict' }).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// log user out
exports.logout = (req, res) => {
  // create expire time one second from now
  let expiry = new Date();
  expiry.setSeconds(expiry.getSeconds() + 1);
  res
    .cookie('token', '', {
      expires: expiry,
      httpOnly: true,
      sameSite: 'strict',
    })
    .send();
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

// get all users
exports.getAll = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

exports.removeUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user)
      return res.status(400).json({ errors: [{ msg: 'User not found' }] });
    user.deleteOne();
    res.json({ msg: 'User removed' });
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId')
      return res.status(400).json({ errors: [{ msg: 'User not found' }] });

    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};
