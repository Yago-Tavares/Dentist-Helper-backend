const restful = require('node-restful');
const mongoose = restful.mongoose;
const user = require('./user');

const secretarySchema = user.discriminator('secretary', new mongoose.Schema({
    phone: { type: String, required: true },
    cpf: { type: String, required: true },
    rg: { type: String, required: true },
    address: { type: String, required: true}
}));

module.exports =restful.model('secretary');