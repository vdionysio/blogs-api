const express = require('express');
const { validateJWT } = require('../middlewares');
const controller = require('../controllers/categoryController');

const router = express.Router();

router.post('/', validateJWT, controller.createCategory);
// router.get('/', validateJWT, controller.getUsers);
// router.get('/:id', validateJWT, controller.getUserById);

module.exports = router;
