require('dotenv/config');

const express = require('express');
const app = express();
const cors = require('cors');
const { connection } = require('mongoose');
const listaUsuarios = require('./routes/listaUsuarios');
const cadastro = require('./routes/cadastro');

const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(listaUsuarios);
app.use(cadastro);

app.listen(port, () => { console.log(`Servidor rodando!\nPorta: ${port}`) });
