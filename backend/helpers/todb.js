let fs = require('fs');
var parse = require('csv-parse');
var async = require('async');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const mongoDb = 'toCRM';

let self = {};
var todb = {};

self.parseCsv = (files) => {
  var parser = parse({ delimiter: files.separator }, function (err, data) {
    async.eachSeries(data, function (line, callback) {
      if (files.firstname == 'false') {
        line[0] = '';
      }
      if (files.lastname == 'false') {
        line[1] = '';
      }
      if (files.phone1 == 'false') {
        line[2] = '';
      }
      if (files.phone2 == 'false') {
        line[3] = '';
      }
      if (files.address1 == 'false') {
        line[4] = '';
      }
      if (files.address2 == 'false') {
        line[5] = '';
      }

      todb = {
        campaign: files.campaign,
        firstname: line[0],
        lastname: line[1],
        phone1: line[2],
        phone2: line[3],
        address1: line[4],
        address2: line[5],
        date: files.date,
      };
      insert(todb);
      callback();
    });
  });
  fs.createReadStream('./uploads/' + files.path).pipe(parser);
};

let cachedDb = null;
let insert = (data) => {
  if (cachedDb) {
    console.log('=> using cached database instance');
    return Promise.resolve(cachedDb);
  }
  return new Promise((resolve, reject) => {
    console.log('=> connect to database');
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
      if (err) {
        console.log(err);
        resolve(false);
      }
      var dbo = db.db(mongoDb);
      dbo
        .collection('candidatos')
        .insertOne(data, async function (err, result) {
          if (err) {
            console.log(err);
            resolve(false);
          }
          db.close();
          resolve(true);
        });
    });
  });
};

let getCampaign = (todb) => {
  if (cachedDb) {
    console.log('=> using cached database instance');
    return Promise.resolve(cachedDb);
  }
  console.log('=> connect to database');
  MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) {
      console.log(err);
      resolve(false);
    }
    var dbo = db.db(mongoDb);
    dbo
      .collection('candidatos')
      .find()
      .sort({ $natural: -1 })
      .limit(1)
      .toArray()
      .then((result) => {
        console.log('resuuuult', result);
        todb = +{
          campaign: result[0].campaign ? result[0].campaign++ : 1,
        };
      })
      .catch((err) => {
        console.log('=> an error occurred: ', err);
        return err;
      });
  });
};

module.exports = self;
