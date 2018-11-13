const Dentist = require('./dentist.model');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const dentistService = require('./dentist.service');


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

exports.getAll = ('/getAll', async (req, res) => {
    try {
        await dentistService.getAllDentists((response) => {
            res.status(response.status).send(response);
        });
    } catch (err) {
        res.status(400).send({ error: err.message});
    }

});

exports.getOne = ('/getOne', async (req, res) => {
    try {

        await dentistService.getOne(req.params.id, (response) => {
            res.status(response.status).send(response);
        });
    } catch (e) {
        res.status(400).send({ error: e});
    }

});

exports.update = ('/update-dentist', async (req, res) => {
    try {
        await dentistService.updateDentist(req.params.id, req.body, (response) => {
            res.status(response.status).send(response);
        });
    } catch (e) {
        console.log(e);
        res.status(400).send('Falha ao atualizar. ' + e);
    }
});

exports.delete = ('/delete-dentist', async (req, res) => {
    try {
        const dentistId = req.params.id;
        await dentistService.deleteDentist(dentistId, (response) => {
            res.status(response.status).send(response);
        });
    } catch (e) {
        res.status(400).send('Falha ao remover. ' + e);
    }
});

exports.getAllClients = ('/getAll',async (req, res) => {

    try {
        await dentistService.getAllClients(req.params.id, (response) => {
            res.status(response.status).send(response);
        });

    } catch (error) {
        res.status(response.status).send(response.data);
    }
}); 

module.exports = exports;