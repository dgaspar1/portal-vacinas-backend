require('dotenv/config');

module.exports = {
    mongoUrl: process.env.MONGO_URL,
    tokenSecret: process.env.TOKEN_SECRET || 'secret',
    port: process.env.PORT || 4000,
};
