const express = require('express');
const router = express.Router();

const client = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dhc1l.mongodb.net?retryWrites=true&w=majority`;

let vacinas;

client.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        vacinas = client.db('Portal-Vacinas').collection('Vacina');
        console.log(`Entidade Conectada: Vacina`);        
    }
);

const get = function(req, res) {

    const termoBusca = req.params.termoBusca;
    let where = {};

    if(termoBusca){
        const termoNormalizado = { $regex: '.*' + termoBusca.toUpperCase() + '.*' };

        where = {
            $or: [
                {
                    
                    'nome_padrao': termoNormalizado
                },
                {
                    
                    'descricao_padrao': termoNormalizado
                }
            ]
        }
    }

    vacinas.find(where).toArray((err, result) => {
        if (err) return console.log('Error: ' + err);
            res.send(result);
        }
    );
};

router.get('/PesquisaVacinas/', get);
router.get('/PesquisaVacinas/:termoBusca', get);

module.exports = router;