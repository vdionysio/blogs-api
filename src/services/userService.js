const { Users } = require('../models');
const userSchema = require('../schemas/userSchema');

const validateError = (status, message) => ({
  status,
  message,
});

const createUser = async (user) => {
  const { error } = userSchema.validate(user);

  if (error) throw validateError(400, error.message);

  const userExists = await Users.findOne({ where: { email: user.email } });

  if (userExists) throw validateError(409, 'User already registered');

  const newUser = await Users.create(user);

  return newUser;
};

module.exports = {
  createUser,
};
