require('dotenv/config');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();
const URL = require('./assets/constants');

const PORT = process.env.POST || 9000;
mongoose.connect(URL, {useNewUrlParser: true})
    .then(() => {
        console.log('connect database');
        serverRun();
    })
    .catch(error => console.log(error));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', routes.auth);

function serverRun() {
    app.listen(PORT, () => {
        console.log(`Server run: http://localhost:${PORT}`);
    });
}