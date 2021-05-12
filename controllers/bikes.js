const mongoose = require('mongoose');
const Bike = require('../models/Bike');

// get all bikes
exports.getAll = async (req, res) => {
  try {
    const bikes = await Bike.find().sort({ createdAt: -1 });
    res.json(bikes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// get bike by id
exports.getBike = async (req, res) => {
  try {
    const id = req.params.id;
    const bike = await Bike.findById(id);
    if (!bike)
      return res.status(404).json({ errors: [{ msg: 'Bike not found' }] });

    res.json(bike);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// create new bike
exports.createBike = async (req, res) => {
  try {
    const bike = req.body;
    const newBike = new Bike(bike);
    const saveBike = await newBike.save();
    res.json(saveBike);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// remove a bike
exports.removeBike = async (req, res) => {
  try {
    const id = req.params.id;
    const bike = await Bike.findById(id);
    if (!bike)
      return res.status(400).json({ errors: [{ msg: 'Bike not found' }] });

    bike.deleteOne();
    res.json({ msg: 'Bike removed' });
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId')
      return res.status(400).json({ errors: [{ msg: 'Bike not found' }] });

    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// update a bike
exports.updateBike = async (req, res) => {
  try {
    const id = req.params.id;
    const bike = await Bike.findOneAndUpdate({ _id: id }, req.body);
    if (!bike)
      return res.status(400).json({ errors: [{ msg: 'Bike not found' }] });

    res.json(bike);
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId')
      return res.status(400).json({ errors: [{ msg: 'Bike not found' }] });

    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// get a bunch of bikes by their ids
exports.getBikesByIds = async (req, res) => {
  try {
    const ids = req.body.ids;
    // map ids to object ids
    const bikesIds = ids.map((id) => mongoose.Types.ObjectId(id));
    const bikes = await Bike.find({ _id: { $in: bikesIds } });
    res.json(bikes);
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId')
      return res.status(400).json({ errors: [{ msg: 'Bike not found' }] });

    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};
