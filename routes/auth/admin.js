const router = require('express').Router();

const {
  logAdmin,
  logoutAdmin,
  isLoggedIn,
} = require('../../controllers/admin');
const { validateAdminLogIn } = require('../../utils/adminValidation');

// log admin in
router.post('/login', validateAdminLogIn, logAdmin);

// log admin out
router.get('/logout', logoutAdmin);

// true or false if admin is logged in
router.get('/loggedin', isLoggedIn);

module.exports = router;
