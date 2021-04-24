const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
  try {
    // get token
    const token = req.cookies.adminToken;

    // exists?
    if (!token) res.status(401).json({ error: [{ msg: 'Unauthorized' }] });

    // valid?
    const verified = jwt.verify(token, process.env.ADMIN_TOKEN_SECRET);

    // add user to header
    req.user = verified.user;

    // next
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: [{ msg: 'Unauthorized' }] });
  }
};

module.exports = adminAuth;
