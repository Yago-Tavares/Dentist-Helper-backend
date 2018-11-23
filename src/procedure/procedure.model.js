const restful = require('node-restful');
const mongoose = restful.mongoose;

const procedureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Nome da Operação é obrigatório'],
        trim: true
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
    value: {
        type: Number,
        required: [true, 'Valor da operação é obrigatório'],
        trim: true
    }
});

module.exports = restful.model('Procedure', procedureSchema);