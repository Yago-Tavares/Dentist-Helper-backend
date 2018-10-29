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
        required: true
    },

    email: {
        type: String,
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
        required: true
    },

    // type: {
    //     type: String,
    //     enum: ['CLIENT', 'DENTIST', 'SECRETARY', 'CLINIC'],
    //     default: 'CLIENT',
    //     required: true
    // },
    
    address: { 
        type: String, 
        required: false,
        default: "Não informado"
    },
    
    phone: { 
        type: String, 
        required: false,
        default: "Não informado"
    },

    cpf: { 
        type: String, 
        required: false,
        default: "Não informado" 
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