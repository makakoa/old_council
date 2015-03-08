'use strict';

var Flux = require('../Flux');

var SocketStore = Flux.createStore({
  recent: {},
  online: 0,
  getRecent: function() {
    return SocketStore.recent;
  },
  getOnline: function() {
    return SocketStore.online;
  },
  updateRecent: function(data) {
    SocketStore.recent = data;
  },
  updateOnline: function(data) {
    SocketStore.online = data;
  }
}, function(payload) {
  switch (payload.actionType) {
    case 'UPDATE_RECENT':
      SocketStore.updateRecent(payload.data);
      SocketStore.emitChange();
      break;
    case 'UPDATE_ONLINE':
      SocketStore.updateOnline(payload.data);
      SocketStore.emitChange();
      break;
  }
});

module.exports = SocketStore;
