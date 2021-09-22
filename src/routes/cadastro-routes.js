const express = require('express');
const router = express.Router();
const MongoHelper = require('../helpers/mongo-helper');

const post = async function (req, res) {
    
    const usuario = await MongoHelper.getCollection('Usuario');
    
    if (!req.body.nome || !req.body.sobrenome || !req.body.senha) {
        throw new Error('Erro no cadastro, dados inválidos!');
        return;
    }
    
    const novoUsuario = new Usuario({
        "nome": req.body.nome,
        "sobrenome": req.body.sobrenome,
        "email": req.body.email,
        "senha": req.body.senha
     });

    usuario.insertOne(novoUsuario, (err, result) => {
        if (err) return console.log("Error: " + err);
        res.send('Usuário cadastrado com sucesso!');
    });
};

module.exports = router => {
    router.post('/Cadastro', post);
};