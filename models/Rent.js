const mongoose = require('mongoose');

const rentSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customer',
    required: true,
  },
  bikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'bike',
      required: true,
    },
  ],
  startTime: {
    type: Date,
    default: null,
  },
  endTime: {
    type: Date,
    default: null,
  },
  lastStartTime: {
    type: Date,
    default: null,
  },
  hasStarted: {
    type: Boolean,
    default: false,
  },
  isPaused: {
    type: Boolean,
    default: true,
  },
  hasEnded: {
    type: Boolean,
    default: false,
  },
  timeOut: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
  },
  timerRunning: {
    type: Boolean,
    default: false,
  },
  neverPaused: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('rent', rentSchema);

/* 
first request to create new rent:
customer: pass the id
bikes: pass the ids
when we click start: /api/rents/:id/start
startTime: Date.now()
hasStarted: true
timeOut: increase by seconds
when we click pause: /api/rents/:id/pause
isPaused: true
TimeOut: stop increasing
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
