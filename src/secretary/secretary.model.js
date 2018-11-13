const restful = require('node-restful');
const mongoose = restful.mongoose;
const user = require('../users/user.model');

const secretarySchema = user.discriminator('SECRETARY', new mongoose.Schema({
    clinic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CLINIC',
        default: null
    }
}));

module.exports =restful.model('SECRETARY');