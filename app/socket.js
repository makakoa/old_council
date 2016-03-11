'use strict';

var io = require('socket.io-client');
var config = require('config');

console.log('Connecting to: ', config.apiUrl);

var socket = io.connect(config.apiUrl);

module.exports = socket;
