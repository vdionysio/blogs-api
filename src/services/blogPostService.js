const { Op } = require('sequelize');
const { Users, BlogPosts, PostsCategories, Categories } = require('../models');
const postSchema = require('../schemas/blogPostSchema');
const updatePostSchema = require('../schemas/updatePostSchema');
const { validateError } = require('./auxFunctions');

const checkCategoryIds = async (categoryIds) => {
  await Promise.all(categoryIds.map(async (categoryId) => {
    const category = await Categories.findByPk(categoryId);
    if (!category) throw validateError(400, '"categoryIds" not found');
  }));
};

const checkUserEmail = async (email) => {
  const user = await Users.findOne({
    where: {
      email,
    },
  });

  if (!user) throw validateError(400, 'Invalid user');

  return user;
};

const createPostCategory = async (postId, categoryIds) => {
  await Promise.all(categoryIds.map(async (categoryId) => {
    const postCategory = await PostsCategories.create({ postId, categoryId });
    if (!postCategory) throw validateError(400, '"categoryIds" not found');
  }));
};

const createPost = async (postData, { email }) => {
  const { error } = postSchema.validate(postData);

  if (error) throw validateError(400, error.message);

  const { title, content, categoryIds } = postData;

  await checkCategoryIds(categoryIds);
  const { dataValues: { id: userId } } = await checkUserEmail(email);

  const newPost = await BlogPosts.create({ userId, title, content });

  await createPostCategory(newPost.id, categoryIds);
  return newPost;
};

const getPosts = async () => {
  const posts = await BlogPosts.findAll({
    include: [{ model: Users, as: 'user' }, { model: Categories, as: 'categories' }],
  });

  return posts;
};

const getPostById = async (id) => {
  const post = await BlogPosts.findOne({
    where: { id },
    include: [{ model: Users, as: 'user' }, { model: Categories, as: 'categories' }],
  });

  if (!post) throw validateError(404, 'Post does not exist');

  return post;
};

const updatePost = async (postData, { email }, postId) => {
  const { title, content, categoryIds } = postData;

  if (categoryIds) throw validateError(400, 'Categories cannot be edited');

  const { error } = updatePostSchema.validate({ title, content });

  if (error) throw validateError(400, error.message);

  const { dataValues: { id: userId } } = await checkUserEmail(email);

  const post = await BlogPosts.findByPk(postId);

  if (!post) throw validateError(404, 'Post does not exist');

  if (userId !== post.userId) throw validateError(401, 'Unauthorized user');

  await BlogPosts.update(
    { title, content },
    {
      where: {
        id: postId,
      },
      returning: true,
    },
  );
};

const deletePost = async ({ email }, postId) => {
  const { dataValues: { id: userId } } = await checkUserEmail(email);

  const post = await BlogPosts.findByPk(postId);
  if (!post) throw validateError(404, 'Post does not exist');

  if (userId !== post.userId) throw validateError(401, 'Unauthorized user');

  const deletedPost = await BlogPosts.destroy(
    {
      where: {
        id: postId,
      },
    },
  );

  return deletedPost;
};

const getPostsByQuery = async (query) => {
  const posts = await BlogPosts.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.substring]: query } },
        { content: { [Op.substring]: query } },
      ],
    },
    include: [
      { model: Users, as: 'user' },
      { model: Categories, as: 'categories' },
    ],
  });

  return posts;
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsByQuery,
};