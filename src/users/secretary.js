const restful = require('node-restful');
const mongoose = restful.mongoose;
const user = require('./user');

const secretarySchema = user.discriminator('secretary', new mongoose.Schema({
    phone: { type: String, required: false },
    cpf: { type: String, required: false },
    rg: { type: String, required: false },
    address: { type: String, required: false}
}));

module.exports =restful.model('secretary');