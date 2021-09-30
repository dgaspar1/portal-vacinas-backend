const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Usuarios = new Schema({
    nome: {
        type: String,
        required: [true, 'Nome Obrigatório'],
        max: 100
    },
    sobrenome: {
        type: String,
        required: [true, 'Sobrenome Obrigatório'],
        max: 100
    },
    email: {
        type: String,
        required: [true, 'E-mail Obrigatório'],
        max: 100
    },
    senha: {
        type: String,
        required: [true, 'Senha Obrigatória'],
        max: 100
    }
});

module.exports = mongoose.model('Usuarios', Usuarios);
