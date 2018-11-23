const Tooth = require('./tooth.model');
const response = require('../util/responses');

exports.getAllTeeth = async (callback) => {

    await Tooth.find({}).then((result) => {
        if (result) {
            callback(response.ok('Busca Sucesso!', result));
        } else {
            callback(response.notFound('Não existem operações'));
        }
    }).catch((err) => {
        callback(response.internalError())
    });

};

exports.getOneTooth = async (toothId, callback) => {

    await Tooth.find({_id: toothId}).then((result) => {
        if (result) {
            callback(response.ok('Operação encontrada!', result));
        } else {
            callback(response.notFound('Não existem operações'));
        }
    }).catch((err) => {
        callback(response.internalError())
    });

};

exports.createTooth = async (tooth, callback) => {

    var tooth = new Tooth(tooth);
    await tooth.save().then((result) => {
        callback(response.created('Operação criada com Sucesso!', result));    
    }).catch((err) => {
        callback(response.badRequest(err.message));
    });

};

exports.deleteTooth = async (toothId, callback) => {
    
    await Tooth.findByIdAndRemove({_id: toothId}).then((result) => {
        if(result) callback(response.ok('Operação deletada com Sucesso!', ''));
        else callback(response.internalError());
    }).catch((err) => {
        callback(response.badRequest(err.message));
    });

};

exports.updateTooth = async (toothId, callback) => {
    
    await Tooth.findByIdAndUpdate({_id: toothId}).then((result) => {
        if(result) callback(response.ok('Operação atualizada com Sucesso!', ''));
        else callback(response.internalError());
    }).catch((err) => {
        callback(response.badRequest(err.message));
    });

};