const env = require('../configs/env');
const MongoHelper = require('../helpers/mongo-helper');

const post = async (req, res) => {
    const { error } = validador(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const collection = await MongoHelper.getCollection('Usuarios');
    const usuario = await collection.findOne({ email: req.body.email });

    if (!usuario) return res.status(400).json({ error: 'E-mail inválido' });

    const isSenhaValida = await bcrypt.compare(req.body.senha, usuario.senha);
    if (!isSenhaValida) {
        return res.status(400).json({ error: 'Senha incorreta!' });
    }

    const token = jwt.sign(
        {
            nome: usuario.nome,
            id: usuario._id
        },
        env.tokenSecret
    );

    res.send({
        error: null,
        data: {
            token,
        },
    });
};

module.exports = (router) => {
    router.post('/login', post);
};
