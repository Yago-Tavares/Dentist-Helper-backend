const restful = require('node-restful');
const mongoose = restful.mongoose;
const user = require('../users/user.model');

const secretarySchema = user.discriminator('secretary', new mongoose.Schema({
    rg: { type: String, required: false }
}));

module.exports =restful.model('secretary');