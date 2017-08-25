
var path = require('path'),
    express = require('express'),
    server = express(),
    bodyParser = require('body-parser'),
    mustache = require('mustache-express'),
    routes = require('./routes/routes');

server.listen(5000);

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.engine('html', mustache());
server.set('view engine', 'html');
server.set('views', path.join(__dirname, 'views'));

server.use('/assets', express.static(path.join(__dirname, 'assets')));

server.use('/', routes);

module.exports = server;
