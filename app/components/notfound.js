'use strict';

var act = require('lib/act');

var Link = require('./link');

var NotFound = act.cl({
  displayName: '404',

  render: function() {
    return act.el(
      'div',
      null,
      act.el('h1', null, 'Page not found'),
      act.el(Link, {to: 'home', value: 'Return to app'})
    );
  }
});

module.exports = NotFound;
