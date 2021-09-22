const { MongoClient } = require('mongodb');

module.exports = {
  async connect (uri) {
    this.uri = uri;
    await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, (error, client) => {
        if(error) {
            throw error;
        }
        this.client = client;
        this.db = client.db('Portal-Vacinas');
    });

  },

  async disconnect () {
    await this.client.close();
    this.client = null;
    this.db = null;
  },

  async getCollection (name) {
    return this.db.collection(name);
  }
};