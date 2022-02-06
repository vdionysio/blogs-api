const jwt = require('jsonwebtoken');
const service = require('../services/userService');

require('dotenv').config();

const generateToken = (email) => {
  const payload = {
    email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return token;
};

const createUser = async (req, res, next) => {
  try {
    const user = req.body;
    await service.createUser(user);

    const token = generateToken(user.email);

    return res.status(201).json({ token });
  } catch (err) {
    console.log('error on controller', err.message);
    return next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const credentials = req.body;
    await service.login(credentials);

    const token = generateToken(credentials.email);

    return res.status(200).json({ token });
  } catch (err) {
    console.log('error on controller', err.message);
    return next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await service.getUsers();

    res.status(200).json(users);
  } catch (err) {
    console.log('error on controller', err.message);
    return next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await service.getUserById(req.params.id);

    res.status(200).json(user);
  } catch (err) {
    console.log('error on controller', err.message);
    return next(err);
  }
};

module.exports = {
  createUser,
  login,
  getUsers,
  getUserById,
};
