const restful = require('node-restful');
const mongoose = restful.mongoose;

const operationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
});

module.exports = restful.model('Operation', operationSchema);