const restful = require('node-restful');
const mongoose = restful.mongoose;

const toothSchema =  new mongoose.Schema({
    type: { 
        type: String,
        enum: ['INCISIVO', 'CANINO', 'PRÉ-MOLAR', 'MOLAR'],
        required: false
    },
    specification: {
        type: String,
        enum: ['SUPERIOR ESQUERDO', 'SUPERIOR DIREITO', 'INFERIOR ESQUERDO', 'INFERIOR DIREITO'],
        required: false
    },
    procedures: [{
        type : mongoose.Schema.Types.ObjectId, 
        ref: 'Procedure'
    }]
});

module.exports = restful.model('Tooth', toothSchema);