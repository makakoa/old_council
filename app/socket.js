'use strict';

var io = require('socket.io-client');
var config = require('config');

var socket = io.connect(config.apiUrl);

module.exports = socket;
