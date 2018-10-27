const Clinic = require('./model');
const jwt = require('jsonwebtoken');
const config = require('../../../config/config');


exports.verifyToken = async(req, res, next) => {
    const token = req.headers['authorization'];
    console.log("TOKEN ", token);
    if (!token) return res.status(403).send({error: "Token não fornecido."});
    jwt.verify(token, config.secret, (err, decoded) => {
        let userDecoded = decoded.user;
        if (err) return res.status(403).send({error: 'Falha ao autenticat token.' });
        else if (userDecoded.user.type !== 'CLINIC'){
            return res.status(403).send({error: "Não autorizado!"});
        }

        next();
    });
}

exports.getAll = async (req, res) => {
    try {
        const clinics = await Clinic.find({});

        res.status(200).send(clinics);
    } catch (err) {
        res.status(400).send({ error: err.message});
    }

};

exports.getOne = async (req, res) => {
    try {
        console.log(req.params.id);
        const clinic = await Clinic.findById(req.params.id);

        res.status(200).send(clinic);
    } catch (e) {
        console.log(e);
        res.status(400).send({ error: e});
    }

};

exports.delete = async (req, res) => {
    try {
        console.log(req.params.id);
        const clinicId = req.params.id;
        const clinic = await Clinic.deleteOne({ _id: clinicId});
        console.log(clinic);
        res.status(200).send('Deletado com sucesso!')
    } catch (e) {
        console.log(e);
        res.status(400).send('Falha ao remover. ' + e);
    }
};

exports.update = async (req, res) => {
    try {
        console.log(req.body);
        const clinic = await Clinic.findOneAndUpdate({ _id: req.body.id}, req.body);
        console.log(clinic);

        res.status(200).send('Atualizado com sucesso!');

    } catch (e) {
        console.log(e);
        res.status(400).send('Falha ao atualizar. ' + e);
    }
};

module.exports = exports;