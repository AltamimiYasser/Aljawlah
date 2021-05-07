const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
  try {
    // get token
    const token = req.cookies.token;
    const adminToken = req.cookies.adminToken;

    // exists?
    if (!token && !adminToken)
      return res.status(401).json({ error: [{ msg: 'Unauthorized' }] });

    // valid?
    let verified;
    if (token) {
      verified = jwt.verify(token, process.env.TOKEN_SECRET);
    } else {
      verified = jwt.verify(token, process.env.ADMIN_TOKEN_SECRET);
    }

    // add user to req object
    req.user = verified.user;

    // next
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: [{ msg: 'Unauthorized' }] });
  }
};

module.exports = auth;
