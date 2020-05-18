const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    name_user: {
        type: String,
        require: true
    },
    scores: {
        type: Number,
        require: true,
        default: 0
    },
    id_test: {
        type: String,
        require: true
    }
});

module.exports = model('results-tests', schema);