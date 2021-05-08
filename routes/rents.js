const router = require('express').Router();
const {
  getAll,
  getRent,
  createRent,
  updateRent,
  removeRent,
  startTime,
  pauseTime,
  resumeTime,
} = require('../controllers/rent');
const userAuth = require('../middleware/userAuth');

// get all rents
router.get('/', userAuth, getAll);

// get rent by id
router.get('/:id', userAuth, getRent);

// create rent
router.post('/', userAuth, createRent);

// update rent
router.put('/:id', userAuth, updateRent);

// delete rent
router.delete('/:id', userAuth, removeRent);

// start time
router.put('/:id/start', userAuth, startTime);

// pause time
router.put('/:id/pause', userAuth, pauseTime);

// resume time
router.put('/:id/resume', userAuth, resumeTime);
// endTime

module.exports = router;
