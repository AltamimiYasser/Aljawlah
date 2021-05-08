const Rent = require('../models/Rent');
const { calcTimeDiffInSeconds } = require('../utils/calcTimeAndPrice');

// get all rents
exports.getAll = async (req, res) => {
  try {
    const rents = await Rent.find();
    res.json(rents);
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
    const rent = await Rent.findById(id);
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

// create a new rent
exports.createRent = async (req, res) => {
  console.log(req.body);
  try {
    const rent = req.body;
    const newRent = new Rent(rent);
    const savedRent = await newRent.save();
    res.json(savedRent);
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
/* 
first request to create new rent:
customer: pass the id
bikes: pass the ids
when we click start: /api/rents/:id/start
lastStartTime: Date.now()
hasStarted: true
when we click pause: /api/rents/:id/pause
isPaused: true
TimeOut: timeStarted - now
when we click resume:
isPaused: false
isResumed: true
timeOut: continue increasing
when we click end: /api/rents/:id/end
isPaused: false
isResumed: false
hasEnded = true
price: 10 Riyals for every 60 minutes
*/

// start the time for specified rent
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
    rent.hasStarted = true;

    await Rent.findOneAndUpdate({ _id: id }, rent);

    res.status(200).json({ msg: 'timer started' });
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
      return res.status(400).json({ errorss: [{ msg: 'Rent not found' }] });

    if (rent.isPaused)
      return res
        .status(400)
        .json({ errors: [{ msg: 'Timer already paused' }] });

    rent.isPaused = true;

    const now = new Date();
    const dateLastStarted = rent.lastStartTime;
    let difference = calcTimeDiffInSeconds(dateLastStarted, now);

    // add the difference + the last calculated time
    rent.timeOut = difference + rent.timeOut;

    await Rent.findOneAndUpdate({ _id: id }, rent);

    res.json({ msg: 'timer paused' });
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

    if (!rent.isPaused && rent.hasStarted)
      return res
        .status(400)
        .json({ errors: [{ msg: 'Timer already running' }] });

    if (!rent.hasStarted)
      return res.status(400).json({ errors: [{ msg: 'Timer did not start' }] });

    rent.isPaused = false;
    rent.lastStartTime = new Date();

    await Rent.findOneAndUpdate({ _id: id }, rent);
    res.status(200).json({ msg: 'Timer Resumed' });
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId')
      return res
        .status(400)
        .json({ errors: [{ msg: 'Customer or Bike not found' }] });

    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};
