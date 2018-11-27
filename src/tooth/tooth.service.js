const Tooth = require('./tooth.model');
const response = require('../util/responses');

exports.getAllTeeth = async (callback) => {

    await Tooth.find({}).then((result) => {
        if (result) {
            callback(response.ok('Busca Sucesso!', result));
        } else {
            callback(response.notFound('Não existem dentes'));
        }
    }).catch((err) => {
        callback(response.internalError())
    });

};

exports.getOneTooth = async (toothId, callback) => {

    await Tooth.find({_id: toothId}).then((result) => {
        if (result) {
            callback(response.ok('Dente encontrado!', result));
        } else {
            callback(response.notFound('Não existem dentes'));
        }
    }).catch((err) => {
        callback(response.internalError())
    });

};

exports.createTooth = async (tooth, callback) => {

    var tooth = new Tooth(tooth);
    await tooth.save().then((result) => {
        callback(response.created('Dente criado com Sucesso!', result));    
    }).catch((err) => {
        callback(response.badRequest(err.message));
    });

};

exports.deleteTooth = async (toothId, callback) => {
    
    await Tooth.findByIdAndRemove({_id: toothId}).then((result) => {
        if(result) callback(response.ok('Dente deletado com Sucesso!', ''));
        else callback(response.internalError());
    }).catch((err) => {
        callback(response.badRequest(err.message));
    });

};

exports.getByClientID = async (clientId, callback) => {
    
    await Tooth.find({client: clientId}).then((result) => {
        if (result) {
            callback(response.ok('Dente encontrado!', result));
        } else {
            callback(response.notFound('Não existem dentes pra esse cliente'));
        }
    }).catch((err) => {
        callback(response.badRequest(err.message));
    });
};

exports.updateTooth = async (toothId, callback) => {
    
    await Tooth.findByIdAndUpdate({_id: toothId}).then((result) => {
        if(result) callback(response.ok('Dente atualizado com Sucesso!', ''));
        else callback(response.internalError());
    }).catch((err) => {
        callback(response.badRequest(err.message));
    });

};