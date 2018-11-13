const Dentist = require('../dentist/dentist.model');
const Client = require('../client/client');
const Secretary = require('../secretary/secretary.model');

exports.getAllDentists = async (clinicId, callback) =>{

    await Dentist.find({clinic: clinicId}).then((result) => {
        callback({
            status: 200,
            data: result
        });    
    }).catch((err) => {

        callback({status:404, data:'Id da clinica não existe'});
    });;
}

exports.getAllClients = async (clinicId, callback) =>{

    await Client.find({clinic: clinicId}).then((result) => {
        callback({
            status: 200,
            data: result
        });    
    }).catch((err) => {
        callback({status:404, data:'Id da clinica não existe'});
    });;
}

exports.getAllSecretaries = async (clinicId, callback) =>{

    await Secretary.find({clinic: clinicId}).then((result) => {
        callback({
            status: 200,
            data: result
        });    
    }).catch((err) => {
        callback({status:404, data:'Id da clinica não existe'});
    });;
}