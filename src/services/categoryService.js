const { Categories } = require('../models');
const categorySchema = require('../schemas/categorySchema');
const { validateError } = require('./auxFunctions');

const createCategory = async (name) => {
  const { error } = categorySchema.validate({ name });

  if (error) throw validateError(400, error.message);

  const categoryExists = await Categories.findOne({ where: { name } });

  if (categoryExists) throw validateError(409, 'Category already registered');

  const newCategory = await Categories.create({ name });

  return newCategory;
};

module.exports = {
  createCategory,
};
