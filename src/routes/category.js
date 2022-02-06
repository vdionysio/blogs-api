const express = require('express');
const { validateJWT } = require('../middlewares');
const controller = require('../controllers/categoryController');

const router = express.Router();

router.post('/', validateJWT, controller.createCategory);
router.get('/', validateJWT, controller.getCategories);

module.exports = router;
