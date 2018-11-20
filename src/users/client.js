const restful = require('node-restful');
const mongoose = restful.mongoose;
const user = require('./user');

const clientSchema = user.discriminator('client', new mongoose.Schema({
    address: { type: String, required: true},
    phone: { type: String, required: true },
    cpf: { type: String, required: true },
    rg: { type: String, required: true },
    allergies: { type: String, required: true },
    treatment_start_date: { type: String, required: true },
    treatment_end_date: { type: String, required: true }
}));

module.exports =restful.model('client');

