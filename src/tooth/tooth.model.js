const restful = require('node-restful');
const mongoose = restful.mongoose;

const toothSchema =  new mongoose.Schema({
    name: { 
        type: String,
        enum: ['11', '12', '13', '14','15','16','17','18',  // superiores direitos
               '21', '22', '23', '24','25','26','27','28',  // superiores esquerdos
               '31', '32', '33', '34','35','36','37','38',  // inferiores direitos
               '41', '42', '43', '44','45','46','47','48'], // inferiores esquerdos
        required: false
    },
    procedures: [{
        type : mongoose.Schema.Types.ObjectId, 
        ref: 'Procedure'
    }]
});

module.exports = restful.model('Tooth', toothSchema);