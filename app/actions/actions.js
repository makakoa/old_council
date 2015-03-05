//flux actions using mcfly, general names currently TODO: change

'use strict';

var Flux = require('../Flux');

module.exports = Flux.createActions({
  inputChanged: function(data) {
    return {
      actionType: 'INPUT_CHANGED',
      data: data
    };
  },
  inputSubmitted: function(data) {
    return {
      actiontype: 'INPUT_SUBMITTED',
      data: data
    };
  }
});
