const Dentist = require('../dentist/dentist.model');
const Client = require('../client/client.model');
const response = require('../util/responses');


exports.getAllDentists = async (callback) => {

    await Dentist.find({}).then((result) => {
        if(result) callback(response.ok('Busca concluída', result));
        else callback(response.notFound('Nenhum dentista registrado'));

    }).catch((err) => {
        callback(response.badRequest(err.message));
    });

};

exports.getOne = async (dentistId, callback) => {

    await Dentist.findById({_id: dentistId}).then((result) => {
        if(result) callback(response.ok('Busca concluída', result));
    }).catch((err) => {
        callback(response.notFound('ID não encontrado!'));
    });

};

exports.deleteDentist = async (dentistId, callback) => {

    await Dentist.findByIdAndRemove({_id: dentistId}).then((result) => {
        if(result) callback(response.ok('Dentista deletado', ''));
        else callback(response.internalError());

    }).catch((err) => {
        callback(response.badRequest(err.message));
    });

};

exports.updateDentist = async (dentistId, update, callback) => {

    await Dentist.findByIdAndUpdate({_id: dentistId}, {$set: update}).then((result) => {
        if(result) callback(response.ok('Dentista Atualizado!', result));
        else callback(response.internalError());

    }).catch((err) => {
        callback(response.notFound('Não foi possivel atualizar. ID não encontrado!'));
    });

};

exports.getAllClients = async (dentistId, callback) => {

    await Client.find({dentist: dentistId}, '-password -_type').then((result) => {
        if(result == 0) {
            callback(response.notFound('Nenhum cliente cadastrado'));
        }
        else callback(response.ok('Busca Concluida com Sucesso!', result));
    }).catch((err) => {
        callback(response.internalError());
    });

};