const Client = require('./client.model');
const jwt = require('jsonwebtoken');
const config = require('../../config/config.json');


exports.verifyToken = async(req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send({error: "Token não fornecido."});
    jwt.verify(token, config.secret, (err, decoded) => {
        let userDecoded = decoded.user;
        req.user = userDecoded.user;
        if (err) return res.status(403).send({error: 'Falha ao autenticat token.' });
        next();
    });
}

exports.getAll = async (req, res) => {
    try {
        if (req.user._type === 'CLIENT'){
            return res.status(403).send({error: "Não autorizado!"});
        }
        const clients = await Client.find({});

        res.status(200).send({data: clients});
    } catch (err) {
        res.status(400).send({ error: err.message});
    }

};

exports.getOne = async (req, res) => {
    try {
        if (req.user._type === 'CLIENT'){
            return res.status(403).send({error: "Não autorizado!"});
        }
        const client = await Client.findById(req.params.id);

        res.status(200).send(client);
    } catch (e) {
        console.log(e);
        res.status(400).send({ error: e});
    }

};

exports.delete = async (req, res) => {
    try {
        if (req.user._type === 'CLIENT'){
            return res.status(403).send({error: "Não autorizado!"});
        }
        const clientId = req.params.id;
        await Client.deleteOne({ _id: clientId});
        res.status(200).send({message: 'Deletado com sucesso!'})
    } catch (e) {
        console.log(e);
        res.status(400).send({message: 'Falha ao remover. ' + e});
    }
};

exports.update = async (req, res) => {
    try {
        const client = await Client.findOneAndUpdate({ _id: req.user._id}, req.body);
        res.status(200).send({message: 'Atualizado com sucesso!'});

    } catch (e) {
        console.log(e);
        res.status(400).send({message: 'Falha ao atualizar. '+ e} );
    }
};

exports.getClientsByDentist = async (req, res) => {
    try{
        if (req.user._type === 'CLIENT'){
            return res.status(403).send({error: "Não autorizado!"});
        }
        const dentistId = req.params.id;
        const clients = await Client.find({dentist: dentistId});

        res.status(200).send(clients);
    }catch (e) {
        res.status(400).send({message: 'Falha ao retornar clientes. ' + e});
    }
};

module.exports = exports;