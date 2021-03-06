const mongoose = require('mongoose');
const Rent = require('../models/Rent');
const Customer = require('../models/Customer');
const {
  calcTimeDiffInSeconds,
  calcPrice,
} = require('../utils/calcTimeAndPrice');
const { reMap, mapOne } = require('../utils/mapping');
const Bike = require('../models/Bike');

// get all rents
exports.getAll = async (req, res) => {
  try {
    const rents = await Rent.find()
      .populate('customer')
      .populate('bikes')
      .sort({ createdAt: -1 });

    // map all rents and get user's name and phone
    res.json(reMap(rents));
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId')
      return res
        .status(400)
        .json({ errors: [{ msg: 'Customer or Bike not found' }] });

    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// create a new rent
exports.createRent = async (req, res) => {
  try {
    const rent = req.body;

    // rent document
    const newRent = new Rent(rent);
    const savedRent = await newRent.save();

    // customer document
    const customerId = savedRent.customer;
    const customer = await Customer.findById(customerId);

    if (!customer)
      return res
        .status(400)
        .json({ errors: [{ msg: "Customer doesn't exist" }] });

    // add bikes to customer document
    const bikes = rent.bikes;

    await Customer.findOneAndUpdate(
      { _id: customerId },
      { $push: { bikes: { $each: bikes } } }
    );

    // add rent to customer document
    await Customer.findOneAndUpdate(
      { _id: customerId },
      { $push: { rents: savedRent._id } }
    );

    // update bikes status to be out
    const changeBikeStatus = async () => {
      for (const bikeId of rent.bikes) {
        const bike = await Bike.findById(bikeId);
        if (!bike) console.log(`bike not found`);
        bike.isOut = true;
        await bike.save();
      }
    };
    changeBikeStatus();

    // res json
    const resRent = await Rent.findById(savedRent._id)
      .populate('customer')
      .populate('bikes');

    res.json(resRent);
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId')
      return res
        .status(400)
        .json({ errors: [{ msg: 'Customer or Bike not found' }] });

    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// get a rent by id
exports.getRent = async (req, res) => {
  try {
    const id = req.params.id;
    const rent = await Rent.findById(id).populate('customer').populate('bikes');
    if (!rent)
      return res.status(404).json({ errors: [{ msg: 'Rent not found' }] });
    res.json(rent);
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId')
      return res
        .status(400)
        .json({ errors: [{ msg: 'Customer or Bike not found' }] });

    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// update a rent
exports.updateRent = async (req, res) => {
  try {
    const id = req.params.id;
    const rent = await Rent.findOneAndUpdate({ _id: id }, req.body);
    if (!rent)
      return res.status(400).json({ errors: [{ msg: 'Rent not found' }] });

    const savedRent = await Rent.findById(id);
    const resRent = await Rent.findById(savedRent._id)
      .populate('customer')
      .populate('bikes');
    res.json(mapOne(resRent));
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId')
      return res
        .status(400)
        .json({ errors: [{ msg: 'Customer or Bike not found' }] });

    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// delete a rent
exports.removeRent = async (req, res) => {
  try {
    const id = req.params.id;
    const rent = await Rent.findById(id);
    if (!rent)
      return res.status(400).json({ errors: [{ msg: 'Rent not found' }] });

    rent.deleteOne();
    res.json({ msg: 'Rent removed' });
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId')
      return res
        .status(400)
        .json({ errors: [{ msg: 'Customer or Bike not found' }] });

    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// start the time
exports.startTime = async (req, res) => {
  try {
    const id = req.params.id;
    const rent = await Rent.findById(id);

    if (!rent)
      return res.status(404).json({ errors: [{ msg: 'Rent not found' }] });
    // if has started already they cannot start again
    if (rent.hasStarted)
      return res
        .status(400)
        .json({ errors: [{ msg: 'Timer already started' }] });

    rent.lastStartTime = new Date();
    rent.startTime = new Date();
    rent.hasStarted = true;
    rent.timerRunning = true;
    rent.isPaused = false;

    // update bikes status
    const changeBikeStatus = async () => {
      for (const bikeId of rent.bikes) {
        const bike = await Bike.findById(bikeId);
        if (!bike) console.log(`bike not found`);
        bike.isOut = true;
        await bike.save();
      }
    };
    changeBikeStatus();

    await Rent.findOneAndUpdate({ _id: id }, rent);
    const savedRent = await Rent.findById(id);
    const resRent = await Rent.findById(savedRent._id)
      .populate('customer')
      .populate('bikes');
    res.json(mapOne(resRent));
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId')
      return res
        .status(400)
        .json({ errors: [{ msg: 'Customer or Bike not found' }] });

    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// pause time
exports.pauseTime = async (req, res) => {
  try {
    const id = req.params.id;
    const rent = await Rent.findById(id);

    if (!rent)
      return res.status(400).json({ errors: [{ msg: 'Rent not found' }] });

    if (rent.isPaused)
      return res
        .status(400)
        .json({ errors: [{ msg: 'Timer already paused' }] });

    if (!rent.hasStarted)
      return res
        .status(400)
        .json({ errors: [{ msg: "Timer hasn't started" }] });

    rent.isPaused = true;
    rent.timerRunning = false;
    rent.neverPaused = false;

    const now = new Date();
    const dateLastStarted = rent.lastStartTime;
    let difference = calcTimeDiffInSeconds(dateLastStarted, now);

    // update bikes working hours
    const changeBikeWorkingHours = async () => {
      for (const bikeId of rent.bikes) {
        const bike = await Bike.findById(bikeId);
        if (!bike) console.log(`bike not found`);
        bike.workingHours += difference;
        await bike.save();
      }
    };
    changeBikeWorkingHours();

    // add the difference + the last calculated time
    rent.timeOut += difference;

    await Rent.findOneAndUpdate({ _id: id }, rent);
    const savedRent = await Rent.findById(id);
    const resRent = await Rent.findById(savedRent._id)
      .populate('customer')
      .populate('bikes');
    res.json(mapOne(resRent));
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId')
      return res
        .status(400)
        .json({ errors: [{ msg: 'Customer or Bike not found' }] });

    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// resume time
exports.resumeTime = async (req, res) => {
  try {
    const id = req.params.id;
    const rent = await Rent.findById(id);

    if (!rent)
      return res.status(404).json({ errors: [{ msg: 'Rent not found' }] });

    if (!rent.hasStarted)
      return res
        .status(400)
        .json({ errors: [{ msg: "Timer hasn't started" }] });

    if (!rent.hasEnded) {
      if (!rent.isPaused) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Timer already running' }] });
      }
    }

    if (!rent.hasStarted)
      return res.status(400).json({ errors: [{ msg: 'Timer did not start' }] });

    rent.isPaused = false;
    rent.hasEnded = false;
    rent.lastStartTime = new Date();
    rent.timerRunning = true;

    // update to isOut
    const changeBikeWorkingHours = async () => {
      for (const bikeId of rent.bikes) {
        const bike = await Bike.findById(bikeId);
        if (!bike) console.log(`bike not found`);
        bike.isOut = true;
        await bike.save();
      }
    };
    changeBikeWorkingHours();

    await Rent.findOneAndUpdate({ _id: id }, rent);
    const savedRent = await Rent.findById(id);
    const resRent = await Rent.findById(savedRent._id)
      .populate('customer')
      .populate('bikes');
    res.json(mapOne(resRent));
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId')
      return res
        .status(400)
        .json({ errors: [{ msg: 'Customer or Bike not found' }] });

    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// end time
exports.endTime = async (req, res) => {
  try {
    const id = req.params.id;
    const rent = await Rent.findById(id);

    if (!rent)
      return res.status(404).json({ errors: [{ msg: 'Rent not found' }] });

    // time hasn't started?
    if (!rent.hasStarted)
      return res
        .status(400)
        .json({ errors: [{ msg: 'Rent has not started' }] });

    // has ended true
    rent.hasEnded = true;
    rent.timerRunning = false;

    // if the rent is not paused, then calculate the rent
    // from the lastStartTime
    let difference = 0;
    const now = new Date();
    if (!rent.isPaused) {
      const dateLastStarted = rent.lastStartTime;
      difference = calcTimeDiffInSeconds(dateLastStarted, now);
    }

    // isPaused false
    rent.isPaused = true;

    // add end time
    rent.endTime = now;

    // add the difference + the last calculated time
    rent.timeOut = difference + rent.timeOut;

    // calculate price
    const numOfBikes = rent.bikes.length;
    rent.price = calcPrice(rent.timeOut) * numOfBikes;

    // update bikes status
    const changeBikeStatus = async () => {
      for (const bikeId of rent.bikes) {
        const bike = await Bike.findById(bikeId);
        if (!bike) continue;
        bike.isOut = false;
        bike.workingHours += difference;
        await bike.save();
      }
    };
    changeBikeStatus();

    // update rent
    await Rent.findOneAndUpdate({ _id: id }, rent);
    const savedRent = await Rent.findById(id);
    const resRent = await Rent.findById(savedRent._id)
      .populate('customer')
      .populate('bikes');
    res.json(mapOne(resRent));
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId')
      return res
        .status(400)
        .json({ errors: [{ msg: 'Customer or Bike not found' }] });

    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// get a bunch of rents by their ids
exports.getRentsByIds = async (req, res) => {
  try {
    const ids = req.body.ids;

    // map ids to object ids
    const rentsIds = ids.map((id) => {
      if (id) return mongoose.Types.ObjectId(id);
    });

    const rents = await Rent.find({ _id: { $in: rentsIds } })
      .populate('customer')
      .populate('bikes')
      .sort({ createdAt: -1 });
    res.json(reMap(rents));
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId')
      return res.status(400).json({ errors: [{ msg: 'Rent Not Found' }] });

    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};
