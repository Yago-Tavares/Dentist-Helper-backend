const restful = require('node-restful');
const mongoose = restful.mongoose;
const User = require('../users/user.model');

const clinicSchema = User.discriminator('Clinic', new mongoose.Schema({
    phone: { type: String, required: false, default: 'Telefone não informado'   },
    address: { type: String, required: false, default: 'Endereço não informado' }
}));

module.exports =restful.model('Clinic', clinicSchema);