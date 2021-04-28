//app.use('/api/auth/users', require('./routes/auth/users'));
const router = require('express').Router();
const adminAuth = require('../../middleware/adminAuth');

const {
  register,
  singIn,
  logout,
  isLoggedIn,
} = require('../../controllers/users');
const {
  validateRegister,
  validateSignIn,
} = require('../../utils/usersValidation');

// register user route
router.post('/register', adminAuth, validateRegister, register);

// user sign in route
router.post('/login', validateSignIn, singIn);

// user logout route
router.get('/logout', logout);

// get user status isLoggedIn
router.get('/loggedin', isLoggedIn);

module.exports = router;
