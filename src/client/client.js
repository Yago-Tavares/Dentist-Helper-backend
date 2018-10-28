const restful = require('node-restful');
const mongoose = restful.mongoose;
const user = require('../users/user.model');

const clientSchema = user.discriminator('CLIENT', new mongoose.Schema({
    dentist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DENTIST',
        default: null
    },
    allergies: { type: String, required: false, default: 'Não possui alergias' },
    treatment_start_date: { type: String, required: false, default: 'Faltando a data de inicio' },
    treatment_end_date: { type: String, required: false, default: 'Faltando a data de fim' }
}));

module.exports =restful.model('CLIENT');

