const Customer = require('../models/Customer');

// get all customers
exports.getAll = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// get customer by id
exports.getCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findById(id);
    if (!customer)
      return res.status(404).json({ errors: [{ msg: 'Customer not found' }] });

    res.json(customer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// create new customer
exports.createCustomer = async (req, res) => {
  try {
    const customer = req.body;
    const newCustomer = new Customer(customer);
    const saveCustomer = await newCustomer.save();
    res.json(saveCustomer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// remove a customer
exports.removeCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findById(id);
    if (!customer)
      return res.status(400).json({ errors: [{ msg: 'Customer not found' }] });

    customer.deleteOne();
    res.json({ msg: 'Customer removed' });
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId')
      return res.status(400).json({ errors: [{ msg: 'Customer not found' }] });

    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// update a customer
exports.updateCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findOneAndUpdate({ _id: id }, req.body);
    if (!customer)
      return res.status(400).json({ errors: [{ msg: 'Customer not found' }] });

    res.json(customer);
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId')
      return res.status(400).json({ errors: [{ msg: 'Customer not found' }] });

    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// get customer by phone number and return an object with true and customer if
// found, otherwise false and null
exports.getCustomerByPhone = async (req, res) => {
  try {
    const phone = req.params.phone;
    const customer = await Customer.findOne({ phone });
    if (!customer) return res.json({ found: false, customer: null });

    return res.json({ found: true, customer });
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId')
      return res.status(400).json({ errors: [{ msg: 'Customer not found' }] });

    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};
