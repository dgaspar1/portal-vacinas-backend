const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const app = express()

app.use(cors())

let porta = 8080;
app.listen(porta, () => {
    console.log('Servidor em execução na porta: ' + porta);
});

const Usuario = require('./model/Usuario')

const MongoClient = require('mongodb').MongoClient;
const { $where } = require('./model/Usuario');
const uri = 'mongodb+srv://andre:mongo8806@cluster0.dhc1l.mongodb.net?retryWrites=true&w=majority';
const database_name = 'Portal-Vacinas';
const collection_name= 'Usuario'

let db;

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(database_name).collection(collection_name);
        console.log('Conectado à base de dados ' + database_name + '!');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/Cadastro', (req, res, next) => {
    const usuario = new Usuario({
        "nome": req.body.nome,
        "sobrenome": req.body.sobrenome,
        "email": req.body.email,
        "senha": req.body.senha
     });
    console.log(usuario);
    db.insertOne(usuario, (err, result) => {
        if (err) return console.log("Error: " + err);
        console.log('Usuário cadastrado com sucesso!');
        res.send('Usuário cadastrado com sucesso!');
    });
});

app.get('/ListaUsuarios', (req, res, next) => {
    db.find({}).toArray((err, result) => {
        if (err) return console.log("Error: " + err);
        res.send(result);
    });
});
