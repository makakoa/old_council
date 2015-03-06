'use strict';

var express = require('express');
var socket = require('./routes/socket');

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../build'));

var server = require('http').Server(app);
var io = require('socket.io')(server);
io.sockets.on('connection', socket);

server.listen(port, function() {
  console.log('Listening on ' + port);
});
