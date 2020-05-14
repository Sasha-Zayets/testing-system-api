const jwt = require('jsonwebtoken')
const { jwtKey } = require('../assets/constants');
const User = require('../models/Users');

const hasUser = async(token) => {
    try {
        const { id } = jwt.verify(token, jwtKey);
        const user = await User.findById(id);
        if(user) return user;

        return false;
    } catch(error) {
        console.log(error);
        return false;
    }
}

module.exports = hasUser;