const jwt = require('jsonwebtoken')
const { jwtKey } = require('../assets/constants');
const Tests = require('../models/Tests');
const User = require('../models/Users');

const addTest = async(req, res) => {
    try {
        const { token, name, description, questions } = req.body;
        const { id } = jwt.verify(token, jwtKey);
        const user = await User.findById(id);
        
        if(user) {
            const newTest = new Tests({
                idUser: id,
                name,
                description,
                questions
            });

            const result = await newTest.save();
            res.status(200).send(result);
        } else {
            res.status(400).send({
                message: 'user not found'
            });
        }
    } catch(error) {
        res.status(400).send(error);
    }
}

const allTest = async(req, res) => {
    try {
        const { token } = req.body;
        const { id } = jwt.verify(token, jwtKey);
        const user = await User.findById(id);
        
        if(user) {
            const result = await Tests.find({ idUser: id});
            console.log(result);
            res.status(200).send(result);
        }
    } catch(error) {
        res.status(400).send(error);
    }
}

const removeTest = async(req, res) => {
    try {
        // code
    } catch(error) {
        res.status(400).send(error);
    }
}

module.exports = {
    addTest,
    allTest,
    removeTest
}