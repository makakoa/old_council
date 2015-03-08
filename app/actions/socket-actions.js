//actions for server updates

'use strict';

var Flux = require('../Flux');
var socket = require('../socket');

socket.on('recent', function(data) {
  SocketActions.updateRecent(data);
});

socket.on('update:recent', function(data) {
  SocketActions.updateRecent(data);
});

socket.on('online', function(data) {
  SocketActions.updateOnline(data);
});

var SocketActions = Flux.createActions({
  updateRecent: function(data) {
    return {
      actionType: 'UPDATE_RECENT',
      data: data
    };
  },
  updateOnline: function(data) {
    return {
      actionType: 'UPDATE_ONLINE',
      data: data
    };
  }
});

module.exports = SocketActions;
