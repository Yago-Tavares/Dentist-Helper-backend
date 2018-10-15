const express = require('express');
const router = express.Router();
const operationController = require('./controller');

router.get('/operation', operationController.getAll);
router.get('/operation/:id', operationController.getOne);
router.post('/operation', operationController.create);
router.put('/operation', operationController.update);
router.delete('/operation', operationController.delete);

module.exports = router;