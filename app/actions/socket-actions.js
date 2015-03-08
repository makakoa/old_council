//actions for server updates

'use strict';

var Flux = require('../Flux');
var socket = require('../socket');

socket.on('online', function(data) {
  console.log(data);
});

socket.on('update:users', function(data) {
  console.log(data);
};

var SocketActions = Flux.createActions({
  updateRecent: function(data) {
    return {
      actionType: 'UPDATE_RECENT',
      data: data
    };
  },
  updateUsers: function(data) {
    return {
      actionType: 'UPDATE_USERS',
      data: data
    }
  };
});

module.exports = SocketActions;
