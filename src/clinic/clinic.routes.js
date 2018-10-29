const express = require('express');
const router = express.Router();
const clinicController = require('./clinic.controller');

router.get('/clinic', clinicController.verifyToken, clinicController.getAll);
router.get('/clinic/:id', clinicController.verifyToken, clinicController.getOne); 
router.get('/clinic/:id/dentists', clinicController.getAllDentist);
router.get('/clinic/:id/clients', clinicController.getAllClients);
router.get('/clinic/:id/secretaries', clinicController.getAllSecretaries);
router.put('/clinic', clinicController.verifyToken, clinicController.update);
router.delete('/clinic/:id', clinicController.verifyToken, clinicController.delete);
module.exports = router;