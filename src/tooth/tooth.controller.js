const toothService = require('../tooth/tooth.service')

exports.getAll = async (req, res) => {
    try {
        toothService.getAllTeeth((response) => {
            res.status(response.status).send(response);
        });
    } catch (e) {
        res.status(400).send({ error: e});
    }
};

exports.getOne = async (req, res) => {
    try {
        await toothService.getOneTooth(req.params.id, (response) => {
            res.status(response.status).send(response);
        });
    } catch (e) {
        res.status(400).send({ error: e});
    }

};

exports.create = async (req, res) => {
    try{
        await toothService.createTooth(req.body, (response) => {
            res.status(response.status).send(response);
        }) 

    } catch (e) {
        res.status(400).send({ error: 'Falha ao salvar. ' + e});
    }
};

exports.delete = async (req, res) => {
    try {

        await toothService.deleteTooth(req.params.id, (response) => {
            res.status(response.status).send(response);
        });
    } catch (e) {
        res.status(400).send({message: 'Falha ao remover. ' + e} );
    }
};

exports.update = async (req, res) => {
    try {
        await toothService.updateTooth(req.params.id, (response) => {
            res.status(response.status).send(response);
        })

    } catch (e) {
        res.status(400).send({message: 'Falha ao atualizar. ' + e});
    }
};

module.exports = exports;