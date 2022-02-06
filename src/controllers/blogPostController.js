const service = require('../services/blogPostService');

const createPost = async (req, res, next) => {
  try {
    const category = await service.createPost(req.body, req.user);

    return res.status(201).json(category);
  } catch (err) {
    console.log('error on controller', err.message);
    return next(err);
  }
};

module.exports = {
  createPost,
};
