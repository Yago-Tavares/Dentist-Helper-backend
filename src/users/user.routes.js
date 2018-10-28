const express = require('express');
const router = express.Router();
const userController = require('../users/user.controller');

router.put('/user/:id', userController.update);

module.exports = router;