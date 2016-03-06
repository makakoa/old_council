'use strict';

var io = require('socket.io-client');

var socket = io.connect('http://localhost:3000');

module.exports = socket;
