
const express = require('express'),
      server = express(),
      index = require('./index/index');

server.get('/', index.index);

module.exports = server;
