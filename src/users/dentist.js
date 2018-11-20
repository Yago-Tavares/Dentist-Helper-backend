const restful = require('node-restful');
const mongoose = restful.mongoose;
const user = require('./user');

const dentistSchema = user.discriminator('dentist', new mongoose.Schema({
    phone: { type: String, required: true },
    cpf: { type: String, required: true },
    rg: { type: String, required: true },
    cro: { type: Number, required: true }
}));

module.exports =restful.model('dentist');