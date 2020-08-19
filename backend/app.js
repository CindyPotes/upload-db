var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const Busboy = require('busboy');
const http = require('http');
const path = require('path');
const fs = require('fs');
const pretty = require('prettysize');
const moment = require('moment');
var cors = require('cors');
const port = 3000;

const todbHelpers = require('./helpers/todb');
const getdbHelpers = require('./helpers/getdb.js');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get('/items', function (req, res) {
  console.log('asdasdasd');
  res.end(getdbHelpers.getdb());
});

app.post('/upload', function (req, res) {
  let fields = [];
  var busboy = new Busboy({ headers: req.headers });
  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    var filename = filename.replace(/[*|,":<>\][{}`'_;@&$#%()]/g, '');
    var momentDate = Date.now();
    var saveTo = path.join('uploads/', path.basename(momentDate + filename));
    file.pipe(fs.createWriteStream(saveTo));
    file.on('end', function () {
      fields['name'] = filename;
      fields['file'] = momentDate + filename;
      fields['bytesSize'] = file._readableState.pipes.bytesWritten;
      fields['size'] = pretty(file._readableState.pipes.bytesWritten);
      fields['type'] = mimetype;
    });
  });
  busboy.on('field', function (
    fieldname,
    val,
    fieldnameTruncated,
    valTruncated,
    encoding,
    mimetype
  ) {
    if (fieldname != 'undefined') {
      fields[fieldname] = val;
    }
  });
  busboy.on('finish', function () {
    if (fields['file'] && fields['firstname'] && fields['lastname']) {
      let files = {
        date: moment().format('D/M/Y H:mm'),
        name: fields['name'],
        path: fields['file'],
        separator: fields['separator'],
        campaign: fields['campaign'],
        firstname: fields['firstname'],
        lastname: fields['lastname'],
        phone1: fields['phone1'],
        phone2: fields['phone2'],
        address1: fields['address1'],
        address2: fields['address2'],
      };
      todbHelpers.parseCsv(files);
    }
  });
  req.pipe(busboy);
});
