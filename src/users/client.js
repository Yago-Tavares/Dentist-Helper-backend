const restful = require('node-restful');
const mongoose = restful.mongoose;
const user = require('./user');

const clientSchema = user.discriminator('client', new mongoose.Schema({
    address: { type: String, required: false},
    phone: { type: String, required: false },
    cpf: { type: String, required: false },
    rg: { type: String, required: false },
    allergies: { type: String, required: false },
    treatment_start_date: { type: String, required: false },
    treatment_end_date: { type: String, required: false }
}));

module.exports =restful.model('client');

