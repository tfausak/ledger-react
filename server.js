var express = require('express');
var server = express();

server.use(express.static('static'));

var host = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var port = process.env.OPENSHIFT_NODEJS_PORT || 8000;

server.listen(port, host, function () {
  console.info('http://' + host + ':' + port);
});
