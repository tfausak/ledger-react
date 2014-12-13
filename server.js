var express = require('express');
var fs = require('fs');
var package = require('./package.json');

var host = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var port = process.env.OPENSHIFT_NODEJS_PORT || 8000;
var url = process.env.LEDGER_API_URL || 'http://localhost:3000';
var version = package.version;

var server = express();

server.get('/', function (request, response) {
  fs.readFile(
    'static/index.html',
    { encoding: 'utf-8' },
    function (error, data) {
      if (error) {
        console.error(error);
        response.status(500).send();
      } else {
        response.send(data
          .replace('LEDGER_API_URL_PLACEHOLDER', url)
          .replace('LEDGER_REACT_VERSION_PLACEHOLDER', version));
      }
    }
  );
});

server.use(express.static('static'));

server.listen(port, host, function () {
  console.info(host + ':' + port);
});
