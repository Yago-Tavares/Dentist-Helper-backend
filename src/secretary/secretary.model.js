const restful = require('node-restful');
const mongoose = restful.mongoose;
const user = require('../users/user.model');

const secretarySchema = user.discriminator('Secretary', new mongoose.Schema({
    clinic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clinic',
        required: [true, 'Informe a clinica']
    }
}));

module.exports =restful.model('Secretary', secretarySchema);