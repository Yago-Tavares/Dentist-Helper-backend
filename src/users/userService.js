const User = require('../users/user.model')

// User.methods(['get', 'post', 'put', 'delete'])

// User.updateOptions({new: true, runValidators: true})

exports.updateUser = async (userId, callback) => {

    await User.findByIdAndUpdate(userId).then((result) => {

        callback({
            status: 200,
            message: "Atualizado com Sucesso!",
            data: result
        });

    }).catch((err) => {
        
        callback({
            status: 400,
            message: "Não foi possivel Atualizar o usuario",
            data: err
        });
    });;
};

// module.exports = user