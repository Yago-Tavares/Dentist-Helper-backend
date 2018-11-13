const express = require('express');
const router = express.Router();
const secretaryController = require('./secretary.controller');

router.get('/secretary', secretaryController.verifyToken, secretaryController.getAll);
router.get('/secretary/:id', secretaryController.verifyToken, secretaryController.getOne);
router.put('/secretary', secretaryController.verifyToken, secretaryController.update);
router.delete('/secretary/:id', secretaryController.verifyToken, secretaryController.delete);

module.exports = router;
