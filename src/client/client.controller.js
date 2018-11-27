const jwt = require('jsonwebtoken');
const config = require('../../config/config.json');
const clientService = require('../client/client.service')


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
        await clientService.getAllClients((response) => {
            res.status(response.status).send(response);
        });
    } catch (err) {
        res.status(400).send({ error: err.message});
    }

};


exports.getOne = async (req, res) => {
    try {
        await clientService.getOne(req.params.id, (response) => {
            res.status(response.status).send(response);
        });
    } catch (e) {
        res.status(400).send({ error: e});
    }

};

exports.update = async (req, res) => {
    try {
        await clientService.updateClient(req.params.id, req.body, (response) => {
            res.status(response.status).send(response);
        });
    } catch (e) {
        res.status(400).send({message: 'Falha ao atualizar. ' + e} );
    }
};



exports.delete = async (req, res) => {
    try {
        const clientId = req.params.id;
        await clientService.deleteClient(clientId, (response) => {
            res.status(response.status).send(response);
        });
    } catch (e) {
        res.status(400).send({message: 'Falha ao remover. ' + e });
    }
};


exports.getClientsByDentist = async (req, res) => {
    
    try {
        await dentistService.getAllClientsByDentist(req.params.id, (response) => {
            res.status(response.status).send(response);
        });

    } catch (error) {
        res.status(response.status).send(response.data);
    }
};

module.exports = exports;