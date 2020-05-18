const Tests = require('../models/Tests');
const ResultTests = require('../models/ResultsTests');
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
        console.log(token);
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

const getTest = async(req, res) => {
    try {
        const { id } = req.body;
        const result = await Tests.findById(id);

        res.status(200).send(result);
    } catch(error) {
        console.log(error);
        res.status(400).send(error);
    }
}

const resultTest = async(req, res) => {
    try {
        const { id, name, questions } = req.body;
        const { 
            questions: questionDateBase, 
            name: nameTest,
            description: descriptionTest 
        } = await Tests.findById(id);

        if(questionDateBase) {
            let scores = 0;
            console.log(questionDateBase)
            questionDateBase.forEach((item, index) => {
                const userAnswer = Number(questions[index].rightAnswer);
                const dataBaseAnswer = Number(item.value);

                if(dataBaseAnswer === userAnswer) {
                    scores++;
                }
            });

            const resultTests = new ResultTests({
                name: nameTest,
                description: descriptionTest,
                name_user: name,
                scores,
                id_test: id
            });
            const result = await resultTests.save();

            res.status(200).send(result);
        } else {
            res.status(204).send({
                message: 'not found test'
            });
        }
    } catch(error) {
        console.log(error);
    }
}

const getTestResults = async(req, res) => {
    try {
        const { id } = req.params;
        const result = await ResultTests.find({ id_test: id });
        
        res.status(200).send(result);
    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    addTest,
    allTest,
    removeTest,
    getTest,
    resultTest,
    getTestResults
}