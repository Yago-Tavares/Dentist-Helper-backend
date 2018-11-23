const express = require('express');
const router = express.Router();
const procedureController = require('./procedure.controller');

router.get('/procedure', procedureController.getAll);
router.get('/procedure/:id', procedureController.getOne);
router.post('/procedure', procedureController.create);
router.put('/procedure/:id', procedureController.update);
router.delete('/procedure/:id', procedureController.delete);

module.exports = router;