const express = require('express');
const router = express.Router();
const clinicController = require('./controller');

router.get('/clinic', clinicController.verifyToken, clinicController.getAll);
router.get('/clinic/:id', clinicController.verifyToken, clinicController.getOne); 
router.put('/clinic', clinicController.verifyToken, clinicController.update);
router.delete('/clinic/:id', clinicController.verifyToken, clinicController.delete);

module.exports = router;