//app.use('/api/bikes', require('./routes/bikes'));
const router = require('express').Router();
const adminAuth = require('../middleware/adminAuth');
const userAuth = require('../middleware/userAuth');
const {
  getAll,
  getBike,
  createBike,
  removeBike,
  updateBike,
  getBikesByIds,
} = require('../controllers/bikes');
const { validateNewBike } = require('../utils/bikeValidation');

// list all bikes
router.get('/', userAuth, getAll);

// get bike by id
router.get('/:id', userAuth, getBike);

// add a new bike
router.post('/', adminAuth, validateNewBike, createBike);

// delete a bike
router.delete('/:id', adminAuth, removeBike);

// update a bike
router.put('/:id', adminAuth, updateBike);

// get bikes by ids
router.post('/group', userAuth, getBikesByIds);

module.exports = router;
