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

const get = function(req, res) {
    usuario.find({}).toArray((err, result) => {
        if (err) return console.log("Error: " + err);
            res.send(result);
        }
    );
};

router.get('/ListaUsuarios', get);

module.exports = router;