const { Schema, model } = require('mongoose');

const schema = new Schema({
    idUser: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    questions: {
        type: Array,
        require: true
    }
});

module.exports = model('all-tests', schema);