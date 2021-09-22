const express = require('express');
const router = express.Router();
const MongoHelper = require('../helpers/mongo-helper');

const get = async function(req, res) {
    
    const vacina = await MongoHelper.getCollection('Vacina');

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

    vacina.find(where).toArray((err, result) => {
        if (err) return console.log('Error: ' + err);
            res.send(result);
        }
    );
};

module.exports = router => {
    router.get('/PesquisaVacinas/:termoBusca', get);
    router.get('/PesquisaVacinas/', get);
};