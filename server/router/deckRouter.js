const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const jwtController = require('../controllers/jwtController');

router.get('/', jwtController.authenticate, (req, res) => {
  return res.send('Authenticated!');
});

module.exports = router;
