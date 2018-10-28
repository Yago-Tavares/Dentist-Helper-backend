const restful = require('node-restful');
const mongoose = restful.mongoose;
const user = require('../users/user.model');

const clinicSchema = user.discriminator('CLINIC', new mongoose.Schema({
    phone: { type: String, required: false },
    address: { type: String, required: false }
}));

module.exports =restful.model('CLINIC');