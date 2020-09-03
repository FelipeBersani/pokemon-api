const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

app.use(cors()); //enable all access
app.use(express.json()); // can read request using json
app.use(routes); //redirect correctly app routes
app.use(errors()); //generate better error returns than default error return

module.exports = app;