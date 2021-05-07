// /api/customers
const router = require('express').Router();
const userAuth = require('../middleware/userAuth');
const {
  getAll,
  createCustomer,
  getCustomer,
  removeCustomer,
  updateCustomer,
} = require('../controllers/customers');
const { validateNewCustomer } = require('../utils/customerValidation');

// get all customers
router.get('/', userAuth, getAll);

// create customer
router.post('/', userAuth, validateNewCustomer, createCustomer);

// get customer by id
router.get('/:id', userAuth, getCustomer);

// update customer
router.put('/:id', userAuth, updateCustomer);

// remove a customer
router.delete('/:id', userAuth, removeCustomer);

module.exports = router;
