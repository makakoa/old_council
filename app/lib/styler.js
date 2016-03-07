'use strict';

var _ = require('lodash');

module.exports = function styler() {
  return _.partial(_.extend, {}).apply(null, arguments);
};
