const express = require('express');
const router = express.Router();
const clientController = require('./client.controller');

router.get('/client', clientController.verifyToken, clientController.getAll);
router.get('/client/:id', clientController.verifyToken, clientController.getOne); 
router.put('/client', clientController.verifyToken, clientController.update);
router.delete('/client/:id', clientController.verifyToken, clientController.delete);
router.get('/dentist/list-client/:id', clientController.verifyToken, clientController.getClientsByDentist); 

module.exports = router;