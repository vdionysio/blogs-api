const service = require('../services/blogPostService');

const controllerErrorMessage = 'error on controller';

const createPost = async (req, res, next) => {
  try {
    const newPost = await service.createPost(req.body, req.user);

    return res.status(201).json(newPost);
  } catch (err) {
    console.log(controllerErrorMessage, err.message);
    return next(err);
  }
};

const getPosts = async (req, res, next) => {
  try {
    const posts = await service.getPosts();

    return res.status(200).json(posts);
  } catch (err) {
    console.log(controllerErrorMessage, err.message);
    return next(err);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const post = await service.getPostById(req.params.id);

    return res.status(200).json(post);
  } catch (err) {
    console.log(controllerErrorMessage, err.message);
    return next(err);
  }
};

const updatePost = async (req, res, next) => {
  try {
    await service.updatePost(req.body, req.user, req.params.id);
    const updatedPost = await service.getPostById(req.params.id);

    return res.status(200).json(updatedPost);
  } catch (err) {
    console.log(controllerErrorMessage, err.message);
    return next(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const deletedPost = await service.deletePost(req.user, req.params.id);

    return res.status(204).json(deletedPost);
  } catch (err) {
    console.log(controllerErrorMessage, err.message);
    return next(err);
  }
};

const getPostsByQuery = async (req, res, next) => {
  try {
    const posts = await service.getPostsByQuery(req.query.q);
    return res.status(200).json(posts);
  } catch (err) {
    console.log(controllerErrorMessage, err.message);
    return next(err);
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsByQuery,
};
