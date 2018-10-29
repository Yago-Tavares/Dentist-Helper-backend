const express = require('express');
const router = express.Router();
const operationController = require('./operation.controller');

router.get('/operation', operationController.getAll);
router.get('/operation/:id', operationController.getOne);
router.post('/operation', operationController.create);
router.put('/operation/:id', operationController.update);
router.delete('/operation/:id', operationController.delete);

module.exports = router;