const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authController = require('./login.controller');

router.post('/login', authController.authenticate);
router.post('/register', authController.register);
router.post('/forgot', authController.forgot_password);
router.post('/reset/:token', authController.reset_password);
router.put('/password/:id', authController.update_password);

module.exports = router;