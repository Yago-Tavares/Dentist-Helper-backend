const Dentist = require('../users/user.model');
const response = require('../util/responses');


exports.getAllDentists = async (callback) => {

    await Dentist.findById({}).then((result) => {
        if(result) callback(response.ok('Busca concluída', result));
        else callback(response.notFound('Nenhum dentista registrado'));

    }).catch((err) => {
        callback(response.badRequest(err.message));
    });

};

exports.getOne = async (dentistId, callback) => {

    await Dentist.findById({_id: dentistId}).then((result) => {
        if(result) callback(response.ok('Busca concluída', result));
        else callback(response.notFound('ID não encontrado!'));

    }).catch((err) => {
        callback(response.badRequest(err.message));
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

exports.updateDentist = async (dentistId, callback) => {

    await Dentist.findByIdAndUpdate({_id: dentistId}).then((result) => {
        if(result) callback(response.ok('Dentista Atualizado!', result));
        else callback(response.internalError());

    }).catch((err) => {
        callback(response.badRequest(err.message));
    });

};

exports.getAllClients = async (dentistId, callback) => {

    await Dentist.findById(dentistId).then((result) => {
        callback({
            status: 200,
            data: result
        });

    }).catch((err) => {
        callback({
            status: 400,
            data: 'ID não encontrado'
        });
    });

};