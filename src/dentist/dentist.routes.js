const express = require('express');
const router = express.Router();
const dentistController = require('./dentist.controller');

//id do dentist
router.get('/clients/:id', dentistController.getAllClients);

module.exports = router;
