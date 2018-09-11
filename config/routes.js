const express = require('express')

module.exports = function(server) {

    const router = express.Router()
    server.use('/api', router)
    server.use('/login', require('../src/controllers/authController'))

    const userService = require('../src/users/userService')
    userService.register(router, '/user')
}