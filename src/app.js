require('dotenv/config');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();
const { connectUrl } = require('./assets/constants');

const PORT = process.env.PORT;

mongoose.set('useFindAndModify', false);
mongoose.connect(connectUrl, {useNewUrlParser: true})
    .then(() => {
        console.log('connect database');
        serverRun();
    })
    .catch(error => console.log(error));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
Object.keys(routes).forEach(name => {
    app.use('/api', routes[name]);
});

function serverRun() {
    app.listen(PORT, () => {
        console.log(`Server run: http://localhost:${PORT}`);
    });
}