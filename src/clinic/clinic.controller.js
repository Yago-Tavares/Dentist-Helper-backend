const Clinic = require('./clinic.model');
const jwt = require('jsonwebtoken');
const config = require('../.././config/config.json');
const clinicService = require('./clinic.service');


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

exports.getAllDentist = async (req, res) => {
    try {
        await clinicService.getAllDentists(req.params.id, (response) => {
            res.status(response.status).send(response.data);
        });

    } catch (error) {
        res.status(response.status).send(response.data);
    }
};


exports.getAllClients = async (req, res) => {
    try {
        await clinicService.getAllClients(req.params.id, (response) => {
            res.status(response.status).send(response.data);
        });

    } catch (error) {
        res.status(response.status).send(response.data);
    }
};

exports.getAllSecretaries = async (req, res) => {
    try {
        await clinicService.getAllSecretaries(req.params.id, (response) => {
            res.status(response.status).send(response.data);
        });

    } catch (error) {
        res.status(response.status).send(response.data);
    }
};

module.exports = exports;