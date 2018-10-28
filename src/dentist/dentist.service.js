const Dentist = require('../users/user.model')

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