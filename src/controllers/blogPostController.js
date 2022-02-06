const service = require('../services/blogPostService');

const createPost = async (req, res, next) => {
  try {
    const newPost = await service.createPost(req.body, req.user);

    return res.status(201).json(newPost);
  } catch (err) {
    console.log('error on controller', err.message);
    return next(err);
  }
};

const getPosts = async (req, res, next) => {
  try {
    const posts = await service.getPosts();
    console.log(posts);

    return res.status(200).json(posts);
  } catch (err) {
    console.log('error on controller', err.message);
    return next(err);
  }
};

module.exports = {
  createPost,
  getPosts,
};
