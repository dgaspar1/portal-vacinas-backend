const bcrypt = require('bcryptjs');
const MongoHelper = require('../helpers/mongo-helper');
const Usuarios = require('../schemas/usuarios');
const { validador } = require('../helpers/validador-usuario');

const post = async (req, res, next) => {
    const { error } = validador(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const collection = await MongoHelper.getCollection('Usuarios');
    const isEmailExiste = await collection.findOne({ email: req.body.email });

    if (isEmailExiste) {
        return res.status(400).json({ error: 'E-mail já cadastrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const senha = await bcrypt.hash(req.body.senha, salt);

    const usuario = new Usuarios({
        'nome': req.body.nome,
        'sobrenome': req.body.sobrenome,
        'email': req.body.email,
        'senha': senha
    });

    collection.insertOne(usuario, (err) => {
        if (err) return console.log('Error: ' + err);
        console.log('Cliente cadastrado com sucesso! ');
        res.send('Cliente cadastrado com sucesso!');
    });
};

module.exports = (router) => {
    router.post('/cadastrar-usuario', post);
};
