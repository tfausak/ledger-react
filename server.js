var express = require('express');

var host = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var port = process.env.OPENSHIFT_NODEJS_PORT || 8000;

express().listen(port, host, function () {
  console.info('http://' + host + ':' + port);
});
