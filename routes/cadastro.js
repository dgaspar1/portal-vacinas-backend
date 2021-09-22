const express = require('express');
const router = express.Router();

const client = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dhc1l.mongodb.net?retryWrites=true&w=majority`;
const Usuario = require('../schemas/Usuario');
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
    
    if (!validaEmail(req.body.email) || !req.body.nome || !req.body.sobrenome || !req.body.senha) {
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

function validaEmail(email) {
	
	const usuario = email.substring(0, email.indexOf('@'));
	const dominio = email.substring(email.indexOf('@') + 1, email.length);

	if (
		usuario.length >= 1 &&
		dominio.length >= 3 &&
		usuario.search('@') == -1 &&
		dominio.search('@') == -1 &&
		usuario.search(' ') == -1 &&
		dominio.search(' ') == -1 &&
		dominio.search('.') != -1 &&
		dominio.indexOf('.') >= 1 &&
		dominio.lastIndexOf('.') < dominio.length - 1
	) {
		return true;
	} else {
        return false;
	}
}

router.post('/Cadastro', post);

module.exports = router;