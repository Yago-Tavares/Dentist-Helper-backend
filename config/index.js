const express = require('express');
const router = express.Router();
const login = require('../src/login/login');

module.exports = function(server) {

    server.use('/api', router);
    server.use('/login', login);

    const userService = require('../src/users/userService')
    userService.register(router, '/user')
}