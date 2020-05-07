const jwt = require('jsonwebtoken')
const User = require('../models/Users');
const { jwtKey } = require('../assets/constants');

const updateSettins = async (req, res) => {
    try {
        const { token, name, lastName, description } = req.body;
        const { id } = jwt.verify(token, jwtKey);
        await User.findByIdAndUpdate(id, {
            name,
            lastName,
            description
        });
        const result = await User.findById(id);
        res.status(200).send(result);
    } catch(error) {
        res.status(400).send(error);
    }
}

module.exports = {
    updateSettins
}