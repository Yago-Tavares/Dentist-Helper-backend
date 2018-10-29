const Dentist = require('../dentist/dentist.model');
const Client = require('../client/client.model');
const Secretary = require('../secretary/secretary.model');
const response = require('../util/responses');

exports.getAllDentists = async (clinicId, callback) =>{

    await Dentist.find({clinic: clinicId}, '-password -_type').then((result) => {
        if(result == 0 ) callback(response.badRequest('Nenhum dentista cadastrado nessa clinica!')); 
        else callback(response.ok('Busca Concluída', result)); 
    }).catch((err) => {
        callback(response.internalError());
    });;
}

exports.getAllClients = async (clinicId, callback) =>{

    await Client.find({clinic: clinicId}, '-password -_type').then((result) => {
        if(result == 0 ) callback(response.badRequest('Nenhum cliente cadastrado nessa clinica!')); 
        else callback(response.ok('Busca Concluída', result)); 
    }).catch((err) => {
        callback(response.internalError());
    });
}

exports.getAllSecretaries = async (clinicId, callback) =>{

    await Secretary.find({clinic: clinicId}, '-password -_type').then((result) => {
        if(result == 0 ) callback(response.badRequest('Nenhum secretaria cadastrado nessa clinica!')); 
        else callback(response.ok('Busca Concluída', result)); 
    }).catch((err) => {
        callback(response.internalError());
    });;
}