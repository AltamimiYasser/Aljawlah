// /api/customers
const router = require('express').Router();
const userAuth = require('../middleware/userAuth');
const {
  getAll,
  createCustomer,
  getCustomer,
  removeCustomer,
  updateCustomer,
  getCustomerByPhone,
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

// get a customer by phone
// return true and customer if found
// return false and null if not found
router.get('/byphone/:phone', userAuth, getCustomerByPhone);

module.exports = router;
