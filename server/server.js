'use strict';

var express = require('express');
//TODO: add DB

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../build'));

app.listen(port, function() {
  console.log('Listening on ' + port);
});
