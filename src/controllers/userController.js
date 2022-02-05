const jwt = require('jsonwebtoken');
const service = require('../services/userService');

require('dotenv').config();

const createUser = async (req, res, next) => {
  try {
    const user = req.body;
    await service.createUser(user);

    const payload = {
      email: user.email,
    };
  
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(201).json({ token });
  } catch (err) {
    console.log('error on controller', err.message);
    return next(err);
  }
};

module.exports = {
  createUser,
};
