const restful = require('node-restful');
const mongoose = restful.mongoose;
const user = require('../users/user.model');

const clinicSchema = user.discriminator('CLINIC', new mongoose.Schema({
    phone: { type: String, required: false, default: 'Telefone não informado'   },
    address: { type: String, required: false, default: 'Endereço não informado' }
}));

module.exports =restful.model('CLINIC');