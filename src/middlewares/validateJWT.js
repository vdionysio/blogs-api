const jwt = require('jsonwebtoken');
const { validateError } = require('../services/auxFunctions');
require('dotenv').config();

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) throw validateError(401, 'Token not found');

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');

    req.user = payload;
    return next();
  } catch (err) {
    throw validateError(401, 'Expired or invalid token');
  }
};