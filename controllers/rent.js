const Rent = require('../models/Rent');
const Customer = require('../models/Customer');
const {
  calcTimeDiffInSeconds,
  calcPrice,
} = require('../utils/calcTimeAndPrice');
const { reMap, mapOne } = require('../utils/mapping');

// get all rents
exports.getAll = async (req, res) => {
  try {
    const rents = await Rent.find().populate('customer').populate('bikes');

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

    // res json
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

// get a rent by id
exports.getRent = async (req, res) => {
  try {
    const id = req.params.id;
    const rent = await Rent.findById(id).populate('customer').populate('bikes');
    if (!rent)
      return res.status(404).json({ errors: [{ msg: 'Rent not found' }] });
    console.log('remapping');
    res.json(mapOne(rent));
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

    const now = new Date();
    const dateLastStarted = rent.lastStartTime;
    let difference = calcTimeDiffInSeconds(dateLastStarted, now);

    // add the difference + the last calculated time
    rent.timeOut = difference + rent.timeOut;

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
    rent.lastStartTime = new Date();

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

    // if the rent is not paused, then calculate the rent
    // from the lastStartTime
    let difference = 0;
    if (!rent.isPaused) {
      const now = new Date();
      const dateLastStarted = rent.lastStartTime;
      difference = calcTimeDiffInSeconds(dateLastStarted, now);
    }

    // isPaused false
    rent.isPaused = false;

    // add the difference + the last calculated time
    rent.timeOut = difference + rent.timeOut;
    // calculate price
    rent.price = calcPrice(rent.timeOut);

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
