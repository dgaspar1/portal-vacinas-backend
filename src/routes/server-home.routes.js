const get = async function(req, res) {
    res.send({
        message: 'Bem vindo!'
    });
};

module.exports = (router) => {
    router.get('/home', get);
};
