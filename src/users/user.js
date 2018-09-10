const restful = require('node-restful')
const mongoose = restful.mongoose

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    type: {type: String, enum: ['CLIENT', 'DENTIST', 'SECRETARY'], default: 'CLIENT', required: true}
})

module.exports =restful.model('User', userSchema)