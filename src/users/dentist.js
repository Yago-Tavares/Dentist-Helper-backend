const restful = require('node-restful');
const mongoose = restful.mongoose;
const user = require('./user');

const dentistSchema = user.discriminator('dentist', new mongoose.Schema({
    phone: { type: String, required: false },
    cpf: { type: String, required: false },
    rg: { type: String, required: false },
    cro: { type: Number, required: false }
}));

module.exports =restful.model('dentist');