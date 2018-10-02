const express = require('express');
const router = express.Router();
const login = require('../src/login/routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swaggerDoc/swagger.json');

module.exports = function(server) {
    
    
    server.use('/api', router);
    server.use('/', login);
    server.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    // const userService = require('../src/users/userService')
    // userService.register(router, '/user');
}