const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtController = {};

jwtController.authenticate = (req, res, next) => {
  try {
    console.log(req.headers);
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(403).json({ error: 'token expired' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      return next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = jwtController;
