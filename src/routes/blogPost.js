const express = require('express');
const { validateJWT } = require('../middlewares');
const controller = require('../controllers/blogPostController');

const router = express.Router();

router.post('/', validateJWT, controller.createPost);
// router.get('/', validateJWT, controller.getCategories);

module.exports = router;
