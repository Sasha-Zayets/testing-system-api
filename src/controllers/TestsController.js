const jwt = require('jsonwebtoken')
const { jwtKey } = require('../assets/constants');
const Tests = require('../models/Tests');
const User = require('../models/Users');
const hasUser = require('../helpers/hasUser');

const addTest = async(req, res) => {
    try {
        const { token, name, description, questions } = req.body;
        const user = await hasUser(token);

        if(user) {
            const newTest = new Tests({
                idUser: user.id,
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
        const user = await hasUser(token);

        if(user) {
            const result = await Tests.find({ idUser: user.id});
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

const removeTest = async(req, res) => {
    try {
        const { token, idPost } = req.body;
        const user = await hasUser(token);

        if(user) {
            const result = await Tests.deleteOne({ _id: idPost });
            res.status(200).send({
                message: 'The test has been removed',
                ...result
            });
        } else {
            res.status(400).send({
                message: 'user not found'
            });
        }
    } catch(error) {
        res.status(400).send(error);
    }
}


module.exports = {
    addTest,
    allTest,
    removeTest
}