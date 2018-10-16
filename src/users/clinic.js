const restful = require('node-restful');
const mongoose = restful.mongoose;
const user = require('./user');

const clinicSchema = user.discriminator('clinic', new mongoose.Schema({
    phone: { type: String, required: true },
    address: { type: String, required: true }
}));

module.exports =restful.model('clinic');