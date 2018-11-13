const restful = require('node-restful');
const mongoose = restful.mongoose;
const user = require('../users/user.model');

const dentistSchema = user.discriminator('DENTIST', new mongoose.Schema({
    clinic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CLINIC',
        default: null
    },
    rg: { type: String, required: false, default: "-"},    
    cro: { type: Number, required: false, default: 0 }
}));

module.exports =restful.model('DENTIST');