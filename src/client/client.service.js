const Client = require('./client.model');
const response = require('../util/responses');


exports.getAllClients = async (callback) => {

    await Client.find({}).then((result) => {
        if (result) callback(response.ok('Busca concluída', result));
        else callback(response.notFound('Nenhum Cliente registrado'));
    }).catch((err) => {
        callback(response.badRequest(err.message));
    });
};


exports.getOne = async (clientId, callback) => {

    await Client.findById({ _id: clientId }).then((result) => {
        if (result) callback(response.ok('Busca concluída', result));
    }).catch((err) => {
        callback(response.notFound('ID não encontrado!'));
    });
};


exports.updateClient = async (clientId, update, callback) => {

    await Client.findByIdAndUpdate({ _id: clientId }, { $set: update }).then((result) => {
        if (result) callback(response.ok('Client Atualizado!', result));
        else callback(response.internalError());

    }).catch((err) => {
        callback(response.notFound('Não foi possivel atualizar. ID não encontrado!'));
    });

};


exports.deleteClient = async (clientId, callback) => {

    await Client.findByIdAndRemove({ _id: clientId }).then((result) => {
        if (result) callback(response.ok('Cliente deletado', ''));
        else callback(response.internalError());

    }).catch((err) => {
        callback(response.badRequest(err.message));
    });
};

exports.getAllClientsByDentist = async (clientId, callback) => {

    await Client.find({ _id: clientId }).then((result) => {
        if (result) callback(response.ok('Busca Concluída', ''));
        else callback(response.internalError());

    }).catch((err) => {
        callback(response.badRequest(err.message));
    });
};

