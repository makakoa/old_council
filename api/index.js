'use strict';

var express = require('express'),
    db = require('./db')({
      url: 'postgres://council:1234@localhost:5432/council',
      poolSize: 10,
      enableStore: true,
      debug: true
    });

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../public'));

//socket io
var server = require('http').Server(app);
var io = require('socket.io')(server);
var socketHandler = require('./routes/socket')(io, db);
io.sockets.on('connection', socketHandler);

server.listen(port, function() {
  console.log('Listening on ' + port);
});
