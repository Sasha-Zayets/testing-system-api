const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    showOnSite: {
        type: Boolean,
        default: false
    }
});

module.exports = model('response', schema);