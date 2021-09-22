const express = require('express');
const router = express.Router();

const client = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dhc1l.mongodb.net?retryWrites=true&w=majority`;
let usuario;

client.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        usuario = client.db('Portal-Vacinas').collection('Usuario');
        console.log(`Entidade Conectada: Usuario`);
    }
);

const post = function (req, res) {
    const novoUsuario = new Usuario({
        "nome": req.body.nome,
        "sobrenome": req.body.sobrenome,
        "email": req.body.email,
        "senha": req.body.senha
     });

    usuario.insertOne(novoUsuario, (err, result) => {
        if (err) return console.log("Error: " + err);
        console.log('Usuário cadastrado com sucesso!');
        res.send('Usuário cadastrado com sucesso!');
    });
};

router.get('/Cadastro', post);

module.exports = router;