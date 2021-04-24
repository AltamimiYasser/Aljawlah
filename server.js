const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const adminAuth = require('./middleware/adminAuth');

const app = express();

// app middleware setup
app.use(express.json());
app.use(cookieParser());

// mongoose setup
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log('DB connected successfully')
);

// routes setup
app.use('/api/auth/admin', require('./routes/auth/admin'));
app.get('/', adminAuth, (req, res) => {
  res.send('admin protected');
});

// production setup
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
