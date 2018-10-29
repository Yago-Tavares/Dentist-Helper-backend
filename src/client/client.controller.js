const Client = require('./client');
const jwt = require('jsonwebtoken');
const config = require('../../config/config.json');


exports.verifyToken = async(req, res, next) => {
    const token = req.headers['authorization'];
    console.log("TOKEN ", token);
    if (!token) return res.status(403).send({error: "Token não fornecido."});
    jwt.verify(token, config.secret, (err, decoded) => {
        let userDecoded = decoded.user;
        if (err) return res.status(403).send({error: 'Falha ao autenticat token.' });
        else if (userDecoded.user.type === 'CLIENT'){
            return res.status(403).send({error: "Não autorizado!"});
        }

        next();
    });
}

exports.getAll = async (req, res) => {
    try {
        const clients = await Client.find({});

        res.status(200).send(clients);
    } catch (err) {
        res.status(400).send({ error: err.message});
    }

};

exports.getOne = async (req, res) => {
    try {
        console.log(req.params.id);
        const client = await Client.findById(req.params.id);

        res.status(200).send(client);
    } catch (e) {
        console.log(e);
        res.status(400).send({ error: e});
    }

};

exports.delete = async (req, res) => {
    try {
        const clientId = req.params.id;
        const client = await Client.deleteOne({ _id: clientId});
        res.status(200).send('Deletado com sucesso!')
    } catch (e) {
        console.log(e);
        res.status(400).send('Falha ao remover. ' + e);
    }
};

exports.update = async (req, res) => {
    try {
        const client = await Client.findOneAndUpdate({ _id: req.body.id}, req.body);

        res.status(200).send('Atualizado com sucesso!');

    } catch (e) {
        console.log(e);
        res.status(400).send('Falha ao atualizar. ' + e);
    }
};

exports.getClientsByDentist = async (req, res) => {
    try{
        const dentistId = req.params.id;
        const clients = await Client.find({dentist: dentistId});

        res.status(200).send(clients);
    }catch (e) {
        res.status(400).send('Falha ao retornar clientes. ' + e);
    }
};

module.exports = exports;