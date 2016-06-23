'use strict';

var dbeasy = require('dbeasy');

module.exports = function db(config) {
  return dbeasy.client(config);
};
