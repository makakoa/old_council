'use strict';

var express = require('express');

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../public'));

//socket io
var server = require('http').Server(app);
var io = require('socket.io')(server);
var socket = require('./routes/socket')(io);
io.sockets.on('connection', socket);

server.listen(port, function() {
  console.log('Listening on ' + port);
});
