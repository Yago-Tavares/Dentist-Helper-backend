const express = require('express');
const router = express.Router();
const dentistController = require('./dentist.controller');

router.get('/dentist', dentistController.verifyToken, dentistController.getAll);
router.get('/dentist/:id', dentistController.verifyToken, dentistController.getOne);
router.put('/dentist/:id', dentistController.verifyToken, dentistController.update);
router.delete('/dentist/:id', dentistController.verifyToken, dentistController.delete);
//id do dentist
router.get('/clients/:id', dentistController.getAllClients);

module.exports = router;
