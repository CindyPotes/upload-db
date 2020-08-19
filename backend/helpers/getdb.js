const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const mongoDb = 'toCRM';

let self = {};

let cachedDb = null;
self.getdb = (res) => {
  if (cachedDb) {
    console.log('=> using cached database instance');
    return Promise.resolve(cachedDb);
  }

  return new Promise((resolve, reject) => {
    console.log('=> connect to database');
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
      console.log('entree');

      if (err) {
        console.log(err);
        resolve(false);
      }
      var dbo = db.db(mongoDb);
      dbo
        .collection('candidatos')
        .find()
        .toArray()
        .then((result) => {
          console.log('=> resultado: ', result);
          return {
            statusCode: 200,
            body: JSON.stringify(result),
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET',
            },
          };
        })
        .catch((err) => {
          console.log('=> an error occurred: ', err);
          return {
            statusCode: 500,
            body: 'error',
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET',
            },
          };
        });
    });
  });
};

module.exports = self;
