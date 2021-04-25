const jwt = require('jsonwebtoken');

exports.logAdmin = (req, res) => {
  // get username and password
  const { username, password } = req.body;

  // create token and send it as a cookie using the admin token secret
  const token = jwt.sign({ user: username }, process.env.ADMIN_TOKEN_SECRET);
  res.cookie('adminToken', token, { httpOnly: true }).send();
};

// logout admin
exports.logoutAdmin = (req, res) => {
  res
    .cookie('adminToken', '', {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
};

exports.isLoggedIn = (req, res) => {
  try {
    // get token
    const token = req.cookies.adminToken;

    // exists?
    if (!token) return res.json(false);

    // valid?
    const verified = jwt.verify(token, process.env.ADMIN_TOKEN_SECRET);

    res.json(true);
  } catch (err) {
    res.json(false);
  }
};
