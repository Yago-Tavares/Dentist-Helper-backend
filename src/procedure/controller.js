const Procedure = require('./model');
const async = require('async');

exports.getAll = async (req, res) => {
    try {
        const procedures = await Procedure.find({});

        res.status(200).send(procedures);
    } catch (e) {
        res.status(400).send({ error: e});
    }

};

exports.getOne = async (req, res) => {
    try {
        const procedure = await Procedure.find({_id: req.params.id});

        res.status(200).send(procedure);
    } catch (e) {
        res.status(400).send({ error: e});
    }

};

exports.create = async (req, res) => {
    try{
        const procedure = await Procedure.create(req.body);

        res.status(200).send(procedure);

    } catch (e) {
        res.status(400).send({ error: 'Falha ao salvar. ' + e});
    }
};

exports.delete = async (req, res) => {
    try {
        const procedure = await Procedure.remove(req.body);

        res.status(200).send({message: 'Deletado com sucesso!'})
    } catch (e) {
        res.status(400).send('Falha ao remover. ' + e);
    }
};

exports.update = async (req, res) => {
    try {
        const procedure = await Procedure.findOneAndUpdate(req.body);

        res.status(200).send('Atualizado com sucesso!');

    } catch (e) {
        res.status(400).send('Falha ao atualizar. ' + e);
    }
};

module.exports = exports;