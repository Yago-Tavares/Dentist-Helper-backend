const restful = require('node-restful');
const bcrypt = require("bcryptjs");
const mongoose = restful.mongoose;

const baseOptions = {
    discriminatorKey: '_type',
    collection: 'users'
};

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },

    email: {
        type: String,
        trim: true,
        validate: {
            validator: function(personalEmail) {
                return new RegExp('^([_a-zA-Z0-9-]+(\\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*(\\.[a-zA-Z]{1,6}))?$').test(personalEmail)
            },
            message: '{VALUE} Invalid email'
        },
        required: true
    },

    password: {
        type: String,
        trim: true,
        required: true
    },

    address: { 
        type: String, 
        trim: true,
        required: false,
        default: "Endereço não Informado"
    },
    
    phone: { 
        type: String,
        trim: true,
        required: false,
        default: "Telefone não informado"
    },

    cpf: { 
        type: String,
        trim: true, 
        required: false,
        default: "CPF não informado" 
    },
    
    resetPasswordToken: String,
    resetPasswordExpires: Date
}, baseOptions);

userSchema.pre('save', async function (next) {
    if(this.password) {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    }
});

module.exports =restful.model('User', userSchema)