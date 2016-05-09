'use strict';

var express = require('express'),
    nano = require('nano')('http://localhost:5984');

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../public'));

//socket io
var server = require('http').Server(app);
var io = require('socket.io')(server);
var socketHandler = require('./routes/socket')(io, nano);
io.sockets.on('connection', socketHandler);

server.listen(port, function() {
  console.log('Listening on ' + port);
});
