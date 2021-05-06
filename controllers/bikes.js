const Bike = require('../models/Bike');

// get all bikes
exports.getAll = async (req, res) => {
  try {
    const bikes = await Bike.find();
    res.json(bikes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: [{ msg: 'Server error' }] });
  }
};

// get bike by id
exports.getBike = async (req, res) => {
  try {
    const id = req.params.id;
    const bike = await Bike.findById(id);
    if (!bike)
      return res.status(404).json({ error: [{ msg: 'Bike not found' }] });

    res.json(bike);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: [{ msg: 'Server error' }] });
  }
};

// create new bike
exports.createBike = async (req, res) => {
  console.log(req.body);
  try {
    const bike = req.body;
    const newBike = new Bike(bike);
    const saveBike = await newBike.save();
    res.json(saveBike);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: [{ msg: 'Server error' }] });
  }
};

// remove a bike
exports.removeBike = async (req, res) => {
  try {
    const id = req.params.id;
    const bike = await Bike.findById(id);
    if (!bike)
      return res.status(400).json({ error: [{ msg: 'Bike not found' }] });

    bike.deleteOne();
    res.json({ msg: 'Bike removed' });
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId')
      return res.status(400).json({ error: [{ msg: 'Bike not found' }] });

    res.status(500).json({ error: [{ msg: 'Server error' }] });
  }
};

// update a bike
exports.updateBike = async (req, res) => {
  try {
    const id = req.params.id;
    const bike = await Bike.findOneAndUpdate({ _id: id }, req.body);
    if (!bike)
      return res.status(400).json({ error: [{ msg: 'Bike not found' }] });

    res.json(bike);
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId')
      return res.status(400).json({ error: [{ msg: 'Bike not found' }] });

    res.status(500).json({ error: [{ msg: 'Server error' }] });
  }
};
