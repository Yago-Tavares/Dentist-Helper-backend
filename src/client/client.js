const restful = require('node-restful');
const mongoose = restful.mongoose;
const user = require('../users/user.model');

const clientSchema = user.discriminator('CLIENT', new mongoose.Schema({
    dentist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DENTIST',
        default: null
    },
    allergies: { type: String, required: false, default: 'Não possui alergias' },
    treatment_start_date: { type: String, required: false, default: 'Faltando a data de inicio' },
    treatment_end_date: { type: String, required: false, default: 'Faltando a data de fim' },

    //Arcada Dentaria
    // Superiores Direitos
    supdir_11: { name: String, required: false},
    supdir_12: { name: String, required: false},
    supdir_13: { name: String, required: false},
    supdir_14: { name: String, required: false},
    supdir_15: { name: String, required: false},
    supdir_16: { name: String, required: false},
    supdir_17: { name: String, required: false},
    supdir_18: { name: String, required: false},

    // Superiores Esquerdos
    supesq_21: { name: String, required: false},
    supesq_22: { name: String, required: false},
    supesq_23: { name: String, required: false},
    supesq_24: { name: String, required: false},
    supesq_25: { name: String, required: false},
    supesq_26: { name: String, required: false},
    supesq_27: { name: String, required: false},
    supesq_28: { name: String, required: false},

    // Inferiores Direitos
    infdir_31: { name: String, required: false},
    infdir_32: { name: String, required: false},
    infdir_33: { name: String, required: false},
    infdir_34: { name: String, required: false},
    infdir_35: { name: String, required: false},
    infdir_36: { name: String, required: false},
    infdir_37: { name: String, required: false},
    infdir_38: { name: String, required: false},

    // Inferiores Esquerdos
    infesq_41: { name: String, required: false},
    infesq_42: { name: String, required: false},
    infesq_43: { name: String, required: false},
    infesq_44: { name: String, required: false},
    infesq_45: { name: String, required: false},
    infesq_46: { name: String, required: false},
    infesq_47: { name: String, required: false},
    infesq_48: { name: String, required: false}
}));

module.exports =restful.model('CLIENT');
