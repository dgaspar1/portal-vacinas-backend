require('dotenv/config');

const express = require('express');
const app = express();
const cors = require('cors');
const { connection } = require('mongoose');
const listaUsuarios = require('./routes/listaUsuarios');

const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(listaUsuarios);

app.listen(port);
