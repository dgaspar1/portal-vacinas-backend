require('dotenv/config');

const express = require('express');
const app = express();
const cors = require('cors');
const listaUsuarios = require('./routes/listaUsuarios');
const cadastro = require('./routes/cadastro');
const pesquisaVacina = require('./routes/pesquisaVacina');

const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.listen(port, () => { console.log(`Servidor rodando!\nPorta: ${port}`) });

// ESLint
// index.html nas rotas
// Verificar como instanciar a conexão

app.use(listaUsuarios);
app.use(cadastro);
app.use(pesquisaVacina);