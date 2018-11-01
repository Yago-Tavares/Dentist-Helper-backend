const User = require('../users/user.model');
const response = require('../util/responses');

// User.methods(['get', 'post', 'put', 'delete'])

// User.updateOptions({new: true, runValidators: true})

exports.updateUser = async (userId, update, callback) => {

    await User.findByIdAndUpdate({_id: userId}, {$set: update}).then((result) => {
        if(!result) callback(response.notFound('Usuário não existe'));
        else callback(response.ok('Atualizado com Succeso!', result));
    }).catch((err) => {
        callback(response.badRequest('Não foi possivel atualizar'));
    });;
};

// module.exports = user