//app.use('/api/bikes', require('./routes/bikes'));
const router = require('express').Router();
const adminAuth = require('../middleware/adminAuth');
const {
  getAll,
  getBike,
  createBike,
  removeBike,
  updateBike,
} = require('../controllers/bikes');
const { validateNewBike } = require('../utils/bikeValidation');

// list all bikes
router.get('/', adminAuth, getAll);

// get bike by id
router.get('/:id', adminAuth, getBike);

// add a new bike
router.post('/', adminAuth, validateNewBike, createBike);

// delete a bike
router.delete('/:id', removeBike);

// update a bike
router.put('/:id', updateBike);

module.exports = router;
