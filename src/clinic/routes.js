const express = require('express');
const router = express.Router();
const clinicController = require('./controller');

router.get('/clinic', clinicControler.verifyToken, clinicController.getAll);
router.get('/clinic/:id', clinicControler.verifyToken, clinicController.getOne); 
router.put('/clinic', clinicControler.verifyToken, clinicController.update);
router.delete('/clinic', clinicController.verifyToken, clinicController.delete);

module.exports = router;