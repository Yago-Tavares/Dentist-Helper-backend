const Secretary = require('./secretary.model');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');


exports.verifyToken = async(req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send({error: "Token não fornecido."});
    jwt.verify(token, config.secret, (err, decoded) => {
        let userDecoded = decoded.user;
        req.user = userDecoded.user;
        if (err) return res.status(403).send({error: 'Falha ao autenticar token.' });
        else if ((userDecoded.user._type !== 'CLINIC') && (userDecoded.user._type !== 'DENTIST')){
            return res.status(403).send({error: "Não autorizado!"});
        }

        next();
    });
}

exports.getAll = async (req, res) => {
    try {
        const secretaries = await Secretary.find({});

        res.status(200).send({data: secretaries});
    } catch (err) {
        res.status(400).send({ error: err.message});
    }

};

exports.getOne = async (req, res) => {
    try {
        const secretary = await Secretary.findById(req.params.id);

        res.status(200).send(secretary);
    } catch (e) {
        res.status(400).send({ error: e});
    }

};

exports.delete = async (req, res) => {
    try {
        const secretaryId = req.params.id;
        const secretary = await Secretary.deleteOne({ _id: secretaryId});
        res.status(200).send({message: 'Deletado com sucesso!'})
    } catch (e) {
        res.status(400).send({message: 'Falha ao remover. ' + e});
    }
};

exports.update = async (req, res) => {
    try {
        const secretary = await Secretary.findOneAndUpdate({ _id: req.user._id}, req.body);

        res.status(200).send({message: 'Atualizado com sucesso!'});

    } catch (e) {
        console.log(e);
        res.status(400).send({message: 'Falha ao atualizar. ' + e});
    }
};

module.exports = exports;
