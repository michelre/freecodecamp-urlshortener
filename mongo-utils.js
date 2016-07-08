const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
var mongoUri = process.env.MONGOLAB_URI;
var url = `mongodb://${mongoUri}/surl`;

module.exports = {
  insert: (data) => new Promise((resolve, reject) => {
    MongoClient.connect(url, function(err, db) {
      const collection = db.collection('urls');
      collection.insert(data)
        .then(res => {
          db.close();
          resolve(res)
        }, err => {
          db.close();
          reject(err);
        });
    });
  }),
  get: (id) => new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      const collection = db.collection('urls');
      collection.find({ id }, { _id: 0 })
        .toArray((err, urls) => {
          db.close();
          resolve(urls[0])
        });
    });
  })
}
