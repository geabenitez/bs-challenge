const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoServer = new MongoMemoryServer();

module.exports = async () => {
  mongoose.connect(await mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) throw new Error(err)
    console.log('DB Connected successfully');
  });
}
