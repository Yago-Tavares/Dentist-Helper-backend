const restful = require('node-restful');
const mongoose = restful.mongoose;
const User = require('../users/user.model');

const dentistSchema = User.discriminator('Dentist', new mongoose.Schema({
    clinic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clinic',
        required: [true, 'Informe a clínica do dentista']
    },
    rg: { type: String, required: false, default: 'RG não informado'},    
    cro: { type: Number, required: false, default: 0 }
}));

module.exports =restful.model('Dentist');