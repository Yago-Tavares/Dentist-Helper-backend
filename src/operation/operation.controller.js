const operationService = require('../operation/operation.service')

exports.getAll = async (req, res) => {
    try {
        operationService.getAllOperations((response) => {
            res.status(response.status).send(response);
        });
    } catch (e) {
        res.status(400).send({ error: e});
    }
};

exports.getOne = async (req, res) => {
    try {
        await operationService.getOneOperation(req.params.id, (response) => {
            res.status(response.status).send(response);
        });
    } catch (e) {
        res.status(400).send({ error: e});
    }

};

exports.create = async (req, res) => {
    try{
        await operationService.createOperation(req.body, (response) => {
            res.status(response.status).send(response);
        }) 

    } catch (e) {
        res.status(400).send({ error: 'Falha ao salvar. ' + e});
    }
};

exports.delete = async (req, res) => {
    try {

        await operationService.deleteOperation(req.params.id, (response) => {
            res.status(response.status).send(response);
        });
    } catch (e) {
        res.status(400).send('Falha ao remover. ' + e);
    }
};

exports.update = async (req, res) => {
    try {
        await operationService.updateOperation(req.params.id, (response) => {
            res.status(response.status).send(response);
        })

    } catch (e) {
        res.status(400).send('Falha ao atualizar. ' + e);
    }
};

module.exports = exports;