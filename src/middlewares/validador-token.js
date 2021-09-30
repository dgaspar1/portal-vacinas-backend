const jwt = require('jsonwebtoken');
const env = require('../configs/env');

const validaToken = (req, res, next) => {
    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).json({ error: 'Acesso negado' });
    }

    try {
        const verificado = jwt.verify(token, env.tokenSecret);
        req.usuario = verificado;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Token Inválido' });
    }
};

module.exports = validaToken;
