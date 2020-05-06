const { Schema, model } = require('mongoose');

const schema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    lastName: {
        type: String
    },
    description: {
        type: String
    }
});

module.exports = model('Users', schema);