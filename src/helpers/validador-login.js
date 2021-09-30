const Joi = require('@hapi/joi');

const validador = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).max(100).required().email(),
        senha: Joi.string().min(3).max(100).required()
    });
    return schema.validate(data);
};

module.exports = {
    validador
};
