const { User } = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(401).json({ error: 'user already exists' });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({ username, password: hashedPassword });
    console.log(`new user created: ${newUser}`);
    res.locals.user = newUser;
    return next();
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(401).json({ error: error.message });
  }
};
userController.verifyUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username: username });
    if (!existingUser) {
      return res.status(400).json({ error: 'username not found' });
    }

    const correctPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    console.log('correct password!', correctPassword);

    if (!correctPassword) {
      return res.status(400).json({ message: 'incorrect password' });
    }

    const payload = {
      userId: existingUser._id,
      username: existingUser.username,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1h',
    });

    res.locals.user = existingUser;
    return next();
  } catch (error) {
    console.log('Error verifying user:', error);
    return res.status(400).json({ error: error.message });
  }
};

module.exports = userController;
