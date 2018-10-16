const restful = require('node-restful');
const mongoose = restful.mongoose;

const clinicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: false
    },
    address: {
        type: String,
        required: false
    }
});

module.exports = restful.model('Clinic', clinicSchema);