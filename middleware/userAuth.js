const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
  // there is a token?
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ error: [{ msg: 'Access Denied' }] });

  // token is valid?
  const verified = jwt.verify(token, process.env.TOKEN_SECRET);

  // add user to req object
  req.user = verified.id;

  // go to next
  next();
  try {
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: [{ msg: 'Access Denied' }] });
  }
};

module.exports = auth;
