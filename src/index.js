const env = require('./configs/env');
const MongoHelper = require('./helpers/mongo-helper');

MongoHelper.connect(env.mongoUrl)
    .then(() => {
        const app = require('./configs/app');

        app.listen(env.port, () => {
            console.log('Servidor em execução na porta: ' + env.port);
        });
    });
