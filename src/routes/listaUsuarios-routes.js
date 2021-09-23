const MongoHelper = require('../helpers/mongo-helper');

const get = async function(req, res) {
    const usuario = await MongoHelper.getCollection('Usuario');

    usuario.find({}).toArray((err, result) => {
        if (err) return console.log('Error: ' + err);
        res.send(result);
    },
    );
};

module.exports = (router) => {
    router.get('/ListaUsuarios', get);
};
