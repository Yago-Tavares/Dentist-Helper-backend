const Operation = require('./operation.model');
const async = require('async');

exports.getAll = async (req, res) => {
    try {
        const operations = await Operation.find({});

        res.status(200).send(operations);
    } catch (e) {
        res.status(400).send({ error: e});
    }

};

exports.getOne = async (req, res) => {
    try {
        const operation = await Operation.find({_id: req.params.id});

        res.status(200).send(operation);
    } catch (e) {
        res.status(400).send({ error: e});
    }

};

exports.create = async (req, res) => {
    try{
        const operation = await Operation.create(req.body);

        res.status(200).send(operation);

    } catch (e) {
        res.status(400).send({ error: 'Falha ao salvar. ' + e});
    }
};

exports.delete = async (req, res) => {
    try {
        const operation = await Operation.remove(req.body);

        res.status(200).send('Deletado com sucesso!')
    } catch (e) {
        res.status(400).send('Falha ao remover. ' + e);
    }
};

exports.update = async (req, res) => {
    try {
        const operation = await Operation.findOneAndUpdate(req.body);

        res.status(200).send('Atualizado com sucesso!');

    } catch (e) {
        res.status(400).send('Falha ao atualizar. ' + e);
    }
};

module.exports = exports;