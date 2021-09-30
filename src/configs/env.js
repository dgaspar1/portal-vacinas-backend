require('dotenv/config');

module.exports = {
    mongoUrl: process.env.MONGO_URL,
    port: process.env.PORT || 4000,
    tokenSecret: process.env.TOKEN_SECRET
};
