const express = require('express');
const router = express.Router();
const toothController = require('./tooth.controller');

router.get('/tooth', toothController.getAll);
router.get('/tooth/:id', toothController.getOne);
router.post('/tooth', toothController.create);
router.put('/tooth/:id', toothController.update);
router.delete('/tooth/:id', toothController.delete);
router.get('/tooth/client/:clientId', toothController.getByClientID);

module.exports = router;
