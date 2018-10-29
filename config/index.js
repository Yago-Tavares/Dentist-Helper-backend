const express = require('express');
const router = express.Router();
const login = require('../src/login/routes');
const operation = require('../src/operation/routes');
const clinic = require('../src/clinic/routes');
const dentist = require('../src/dentist/dentist.routes');
const user = require('../src/users/user.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swaggerDoc/swagger.json');

module.exports = function(server) {
    
    
    // server.use('/api', router);
    server.use('/', login);
    server.use('/', operation);
    server.use('/', clinic);
    server.use('/', dentist);
    server.use('/', user);

    server.use('/',swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    // const userService = require('../src/users/userService')
    // userService.register(router, '/user');
}