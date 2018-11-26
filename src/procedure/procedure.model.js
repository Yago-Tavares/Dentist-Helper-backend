const restful = require('node-restful');
const mongoose = restful.mongoose;

const procedureSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['CIRURGIA', 'CANAL', 'RESTAURAÇÃO', 'CLAREAMENTO', 'APLICAÇÃO DE APARELHO', 'MANUTENÇÃO DE APARELHO', 'LIMPEZA', 'IMPLANTE', 'PRÓTESE', 'LENTE DE CONTATO'],
        default: 'LIMPEZA',
        required: [true, 'Tipo da Operação é obrigatório']
    },
    description: {
        type: String,
        required: [true, 'Descrição da Operação é obrigatório'],
        trim: true
    },
    date: {
        type: Date,
        required: false,
        trim: true
    },
    teeth: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tooth',
        default: null,
        required: true
    }],
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CLIENT',
        default: null,
        required: true
    }
});

module.exports = restful.model('Procedure', procedureSchema);