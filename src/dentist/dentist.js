const restful = require('node-restful');
const mongoose = restful.mongoose;
const user = require('../users/user.model');

const dentistSchema = user.discriminator('dentist', new mongoose.Schema({
    rg: { type: String, required: false },
    cro: { type: Number, required: false }
}));

module.exports =restful.model('dentist');