const Operation = require('./operation.model');
const response = require('../util/responses');

exports.getAllOperations = async (callback) => {

    await Operation.find({}).then((result) => {
        if (result) {
            callback(response.ok('Busca Sucesso!', result));
        } else {
            callback(response.notFound('Não existem operações'));
        }
    }).catch((err) => {
        callback(response.internalError())
    });

};

exports.getOneOperation = async (operationId, callback) => {

    await Operation.find({_id: operationId}).then((result) => {
        if (result) {
            callback(response.ok('Operação encontrada!', result));
        } else {
            callback(response.notFound('Não existem operações'));
        }
    }).catch((err) => {
        callback(response.internalError())
    });

};

exports.createOperation = async (operation, callback) => {

    var operation = new Operation(operation);
    await operation.save().then((result) => {
        callback(response.created('Operação criada com Sucesso!', result));    
    }).catch((err) => {
        callback(response.badRequest(err.message));
    });

};

exports.deleteOperation = async (operationId, callback) => {
    
    await Operation.findByIdAndRemove({_id: operationId}).then((result) => {
        if(result) callback(response.ok('Operação deletada com Sucesso!', ''));
        else callback(response.internalError());
    }).catch((err) => {
        callback(response.badRequest(err.message));
    });

};

exports.updateOperation = async (operationId, callback) => {
    
    await Operation.findByIdAndUpdate({_id: operationId}).then((result) => {
        if(result) callback(response.ok('Operação atualizada com Sucesso!', ''));
        else callback(response.internalError());
    }).catch((err) => {
        callback(response.badRequest(err.message));
    });

};