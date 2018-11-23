const procedureService = require('../procedure/procedure.service')

exports.getAll = async (req, res) => {
    try {
        procedureService.getAllProcedures((response) => {
            res.status(response.status).send(response);
        });
    } catch (e) {
        res.status(400).send({ error: e});
    }
};

exports.getOne = async (req, res) => {
    try {
        await procedureService.getOneProcedure(req.params.id, (response) => {
            res.status(response.status).send(response);
        });
    } catch (e) {
        res.status(400).send({ error: e});
    }

};

exports.create = async (req, res) => {
    try{
        await procedureService.createProcedure(req.body, (response) => {
            res.status(response.status).send(response);
        }) 

    } catch (e) {
        res.status(400).send({ error: 'Falha ao salvar. ' + e});
    }
};

exports.delete = async (req, res) => {
    try {

        await procedureService.deleteProcedure(req.params.id, (response) => {
            res.status(response.status).send(response);
        });
    } catch (e) {
        res.status(400).send({message: 'Falha ao remover. ' + e} );
    }
};

exports.update = async (req, res) => {
    try {
        await proceduresService.updateProcedure(req.params.id, (response) => {
            res.status(response.status).send(response);
        })

    } catch (e) {
        res.status(400).send({message: 'Falha ao atualizar. ' + e});
    }
};

module.exports = exports;