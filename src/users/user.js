const restful = require('node-restful')
const bcrypt = require("bcryptjs");
const mongoose = restful.mongoose

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    type: {type: String, enum: ['CLIENT', 'DENTIST', 'SECRETARY'], default: 'CLIENT', required: true},
    resetPasswordToken: String,
    resetPasswordExpires: Date
})

userSchema.pre('save', async function (next) {

    if(this.password) {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    }
});

module.exports =restful.model('User', userSchema)