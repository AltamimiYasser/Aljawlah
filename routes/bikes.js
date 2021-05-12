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
router.get('/', adminAuth, getAll);

// get bike by id
router.get('/:id', adminAuth, getBike);

// add a new bike
router.post('/', adminAuth, validateNewBike, createBike);

// delete a bike
router.delete('/:id', removeBike);

// update a bike
router.put('/:id', updateBike);

// get bikes by ids
router.post('/group', userAuth, getBikesByIds);

module.exports = router;
