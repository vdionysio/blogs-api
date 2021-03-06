const service = require('../services/categoryService');

const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = await service.createCategory(name);

    return res.status(201).json(category);
  } catch (err) {
    console.log('error on controller', err.message);
    return next(err);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await service.getCategories();

    res.status(200).json(categories);
  } catch (err) {
    console.log('error on controller', err.message);
    return next(err);
  }
};

module.exports = {
  createCategory,
  getCategories,
};
