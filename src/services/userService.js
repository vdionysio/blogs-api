const { Users } = require('../models');
const userSchema = require('../schemas/userSchema');
const loginSchema = require('../schemas/loginSchema');
const { validateError } = require('./auxFunctions');

const createUser = async (user) => {
  const { error } = userSchema.validate(user);

  if (error) throw validateError(400, error.message);

  const userExists = await Users.findOne({ where: { email: user.email } });

  if (userExists) throw validateError(409, 'User already registered');

  const newUser = await Users.create(user);

  return newUser;
};

const login = async (credentials) => {
  const { error } = loginSchema.validate(credentials);

  if (error) throw validateError(400, error.message);

  const userExists = await Users.findOne({
    where: {
      email: credentials.email,
      password: credentials.password,
    },
  });

  if (!userExists) throw validateError(400, 'Invalid fields');

  return true;
};

const getUsers = async () => {
  const users = await Users.findAll();

  if (!users) throw validateError(409, 'unknown error');

  return users;
};

module.exports = {
  createUser,
  login,
  getUsers,
};
