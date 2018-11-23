const restful = require('node-restful');
const mongoose = restful.mongoose;

const procedureSchema = new mongoose.Schema({
    tipo: {
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
        required: [true, 'Data da operação é obrigatória'],
        trim: true
    },
    teeth: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tooth',
        default: null,
        required: true
    }]
});

module.exports = restful.model('Procedure', procedureSchema);