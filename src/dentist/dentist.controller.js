const Dentist = require('./dentist');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const dentistService = require('./dentist.service');


exports.verifyToken = async(req, res, next) => {
    const token = req.headers['authorization'];
    console.log("TOKEN ", token);
    if (!token) return res.status(403).send({error: "Token não fornecido."});
    jwt.verify(token, config.secret, (err, decoded) => {
        let userDecoded = decoded.user;
        console.log(userDecoded);
        if (err) return res.status(403).send({error: 'Falha ao autenticar token.' });
        else if ((userDecoded.user._type !== 'CLINIC') && (userDecoded.user._type !== 'DENTIST')){
            return res.status(403).send({error: "Não autorizado!"});
        }

        next();
    });
}

exports.getAll = async (req, res) => {
    try {
        const dentists = await Dentist.find({});

        res.status(200).send(dentists);
    } catch (err) {
        res.status(400).send({ error: err.message});
    }

};

exports.getOne = async (req, res) => {
    try {
        const dentist = await Dentist.findById(req.params.id);

        res.status(200).send(dentist);
    } catch (e) {
        res.status(400).send({ error: e});
    }

};

exports.delete = async (req, res) => {
    try {
        const dentistId = req.params.id;
        const dentist = await Dentist.deleteOne({ _id: dentistId});
        res.status(200).send('Deletado com sucesso!')
    } catch (e) {
        res.status(400).send('Falha ao remover. ' + e);
    }
};

exports.update = async (req, res) => {
    try {
        const dentist = await Dentist.findOneAndUpdate({ _id: req.body.id}, req.body);

        res.status(200).send('Atualizado com sucesso!');

    } catch (e) {
        console.log(e);
        res.status(400).send('Falha ao atualizar. ' + e);
    }
};

exports.getAllClients = ('/getAll', async (req, res) => {

    try {
        await dentistService.getAllClients((req.params.id, (response) => {
            res.status(response.status).send(response.data);
        }));

    } catch (error) {
        console.log(error);
        res.status(response.status).send(response.data);
    }
}); 

module.exports = exports;