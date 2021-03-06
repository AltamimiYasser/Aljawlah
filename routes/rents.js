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
  endTime,
  getRentsByIds,
} = require('../controllers/rent');
const userAuth = require('../middleware/userAuth');
const { validateNewRent } = require('../utils/rentValidation');

// get all rents
router.get('/', userAuth, getAll);

// create rent
router.post('/', userAuth, validateNewRent, createRent);

// get rent by id // details
router.get('/:id', userAuth, getRent);

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
router.put('/:id/end', userAuth, endTime);

// get rent by ids
router.post('/group', userAuth, getRentsByIds);

module.exports = router;
