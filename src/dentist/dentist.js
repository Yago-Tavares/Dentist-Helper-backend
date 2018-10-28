const restful = require('node-restful');
const mongoose = restful.mongoose;
const user = require('../users/user.model');

const dentistSchema = user.discriminator('DENTIST', new mongoose.Schema({
    clients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client'
    }],
    
    cro: { type: Number, required: false, default: 0 }
}));

module.exports =restful.model('DENTIST');