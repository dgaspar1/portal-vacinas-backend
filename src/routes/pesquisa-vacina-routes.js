const MongoHelper = require('../helpers/mongo-helper');
const validaToken = require('../middlewares/validador-token');

const get = async function(req, res) {
    const vacina = await MongoHelper.getCollection('Vacinas');
    const termoBusca = req.params.termoBusca;
    let where = {};

    if (termoBusca) {
        const termoNormalizado = {
            $regex: '.*' + termoBusca.toUpperCase() + '.*'
        };

        where = {
            $or: [
                {
                    'nome_padrao': termoNormalizado,
                },
                {
                    'descricao_padrao': termoNormalizado,
                },
            ],
        };
    }

    vacina.find(where).toArray((err, result) => {
        if (err) return console.log('Error: ' + err);
        res.send(result);
    },
    );
};

module.exports = (router) => {
    router.get('/pesquisa-vacina/:termoBusca', validaToken, get);
    router.get('/pesquisa-vacina/', validaToken, get);
};
