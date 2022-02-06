const express = require('express');
const { validateJWT } = require('../middlewares');
const controller = require('../controllers/userController');

const router = express.Router();

router.post('/', controller.createUser);
router.get('/', validateJWT, controller.getUsers);
router.get('/:id', validateJWT, controller.getUserById);

module.exports = router;
