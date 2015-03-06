'use strict';

var io = require('socket.io');

var socket = io.connect();

module.exports = socket;
