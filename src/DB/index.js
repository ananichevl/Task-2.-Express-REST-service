const mongoose = require('mongoose');

const { MONGO_CONNECTION_STRING } = require('../common/config');

mongoose.set('toJSON', { virtuals: true });

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
const initDB = fn => {
  db.on('error', console.error.bind(console, 'db connection error:'));
  db.once('open', () => {
    db.dropDatabase();
    console.log('db connected');
    fn();
  });
};

module.exports = { db, initDB };
