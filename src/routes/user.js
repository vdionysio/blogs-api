const express = require('express');
const controller = require('../controllers/userController');

const router = express.Router();

router.post('/', controller.createUser);

module.exports = router;
