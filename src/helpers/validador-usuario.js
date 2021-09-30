const Joi = require('@hapi/joi');

const validador = (data) => {
    const schema = Joi.object({
        nome: Joi.string().min(2).max(100).required(),
        sobrenome: Joi.string().min(1).max(100).required(),
        email: Joi.string().min(6).max(100).required().email(),
        senha: Joi.string().min(3).max(100).required()
    });
    return schema.validate(data);
};

module.exports = {
    validador
};
