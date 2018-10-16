const restful = require('node-restful');
const mongoose = restful.mongoose;
const user = require('./user');

const clinicSchema = user.discriminator('clinic', new mongoose.Schema({
    phone: { type: String, required: false },
    address: { type: String, required: false }
}));

module.exports =restful.model('clinic');