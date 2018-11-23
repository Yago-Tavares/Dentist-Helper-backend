const Procedure = require('./procedure.model');
const response = require('../util/responses');

exports.getAllProcedures = async (callback) => {

    await Procedure.find({}).then((result) => {
        if (result) {
            callback(response.ok('Busca Sucesso!', result));
        } else {
            callback(response.notFound('Não existem operações'));
        }
    }).catch((err) => {
        callback(response.internalError())
    });

};

exports.getOneProcedure = async (procedureId, callback) => {

    await Procedure.find({_id: procedureId}).then((result) => {
        if (result) {
            callback(response.ok('Operação encontrada!', result));
        } else {
            callback(response.notFound('Não existem operações'));
        }
    }).catch((err) => {
        callback(response.internalError())
    });

};

exports.createProcedure = async (procedure, callback) => {

    var procedure = new Procedure(procedure);
    await procedure.save().then((result) => {
        callback(response.created('Operação criada com Sucesso!', result));    
    }).catch((err) => {
        callback(response.badRequest(err.message));
    });

};

exports.deleteProcedure = async (procedureId, callback) => {
    
    await Procedure.findByIdAndRemove({_id: procedureId}).then((result) => {
        if(result) callback(response.ok('Operação deletada com Sucesso!', ''));
        else callback(response.internalError());
    }).catch((err) => {
        callback(response.badRequest(err.message));
    });

};

exports.updateProcedure = async (procedureId, callback) => {
    
    await Procedure.findByIdAndUpdate({_id: procedureId}).then((result) => {
        if(result) callback(response.ok('Operação atualizada com Sucesso!', ''));
        else callback(response.internalError());
    }).catch((err) => {
        callback(response.badRequest(err.message));
    });

};