const restful = require('node-restful');
const mongoose = restful.mongoose;
const user = require('../users/user.model');

const toothSchema =  new mongoose.Schema({
    // Superiores Direitos
    supdir_11: { type: String, required: false},
    supdir_12: { type: String, required: false},
    supdir_13: { type: String, required: false},
    supdir_14: { type: String, required: false},
    supdir_15: { type: String, required: false},
    supdir_16: { type: String, required: false},
    supdir_17: { type: String, required: false},
    supdir_18: { type: String, required: false},

    // Superiores Esquerdos
    supesq_21: { type: String, required: false},
    supesq_22: { type: String, required: false},
    supesq_23: { type: String, required: false},
    supesq_24: { type: String, required: false},
    supesq_25: { type: String, required: false},
    supesq_26: { type: String, required: false},
    supesq_27: { type: String, required: false},
    supesq_28: { type: String, required: false},

    // Inferiores Direitos
    infdir_31: { type: String, required: false},
    infdir_32: { type: String, required: false},
    infdir_33: { type: String, required: false},
    infdir_34: { type: String, required: false},
    infdir_35: { type: String, required: false},
    infdir_36: { type: String, required: false},
    infdir_37: { type: String, required: false},
    infdir_38: { type: String, required: false},

    // Inferiores Esquerdos
    infesq_41: { type: String, required: false},
    infesq_42: { type: String, required: false},
    infesq_43: { type: String, required: false},
    infesq_44: { type: String, required: false},
    infesq_45: { type: String, required: false},
    infesq_46: { type: String, required: false},
    infesq_47: { type: String, required: false},
    infesq_48: { type: String, required: false}
});

const clientSchema = user.discriminator('CLIENT', new mongoose.Schema({
    dentist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DENTIST',
        default: null,
        required: true
    },
    clinic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CLINIC',
        default: null
    },
    allergies: { type: String, required: false, default: 'Não possui alergias' },
    treatment_start_date: { type: String, required: false, default: 'Faltando a data de inicio' },
    treatment_end_date: { type: String, required: false, default: 'Faltando a data de fim' },
    tooth: Schema.toothSchema
}));

module.exports =restful.model('CLIENT');
