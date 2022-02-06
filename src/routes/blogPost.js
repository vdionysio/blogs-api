const express = require('express');
const { validateJWT } = require('../middlewares');
const controller = require('../controllers/blogPostController');

const router = express.Router();

router.post('/', validateJWT, controller.createPost);
router.get('/', validateJWT, controller.getPosts);
router.get('/:id', validateJWT, controller.getPostById);
router.put('/:id', validateJWT, controller.updatePost);

module.exports = router;
