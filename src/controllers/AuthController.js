const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/Users');
const { jwtKey } = require('../assets/constants');
const salt = bcrypt.genSaltSync(10);

const registration = async(req, res) => {
    try {
        const { login, password, name, lastName, description } = req.body;
        if(login.length < 3 || password.length < 3) {
            res.status(203).send({
                'message': 'login or password is not valid'
            });
        } else {
            const hashPassword = bcrypt.hashSync(password, salt);
            const newUser = new User({
                login,
                password: hashPassword,
                name,
                lastName,
                description
            });
            const result = await newUser.save();
            res.send(result);
        }
    } catch(error) {
        if(error.code === 11000) {
            res.status(409).send({
                message: 'a user with such a login exists'
            });
        } else {
            console.log(error.code);
        }
    }
}

const login = async(req, res) => {
    try {
        const { login, password } = req.body;
        const loginUser = await User.findOne({ login });
        if (loginUser) {
            const passwordResult = bcrypt.compareSync(password, loginUser.password);
            if (passwordResult) {
                const token = jwt.sign({
                    login,
                    password,
                    id: loginUser._id
                }, jwtKey, {expiresIn: 60 * 60});

                res.status(200).send({
                    id: loginUser._id,
                    token
                });
            } else {
                res.status(404).send({
                    message: 'password not valid'
                });
            }
        } else {
            res.status(203).send({
                message: 'User not found'
            });
        }
    } catch(error) {
        console.log(error);
        res.status(400).send(error);
    }
}

module.exports = {
    registration,
    login
}