const restful = require('node-restful');
const mongoose = restful.mongoose;
const user = require('../users/user.model');

const secretarySchema = user.discriminator('SECRETARY', new mongoose.Schema({
}));

module.exports =restful.model('SECRETARY');