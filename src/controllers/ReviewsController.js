const Response = require('../models/Reviews');

const getAll = async (req, res) => {
    try {
        const result = await Response.find();
        res.status(200).send(result);
    } catch(error) {
        res.status(400).send(error);
    }
}

const addReview = async (req, res) => {
    try {
        const { name, description, showOnSite } = req.body;

        if(name.length > 3 && description.length > 3) {
            const review = new Response({
                name,
                description,
                showOnSite
            });
            const result = await review.save();
            res.status(200).send(result);
        } else {
            throw { message: 'Check the validity of the fields' };
        }
    } catch(error) {
        res.status(400).send(error);
    }
}

module.exports = {
    getAll,
    addReview
}