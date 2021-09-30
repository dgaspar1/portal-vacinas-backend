const express = require('express');
const cors = require('cors');
const setupRoutes = require('./routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

setupRoutes(app);

module.exports = app;
