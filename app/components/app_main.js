'use strict';

var act = require('lib/act');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

require('../actions/socket-actions'); // global socket listeners

var App = act.cl({
  displayName: 'App',

  render: function() {

    return act.el(
      'div',
      {className: 'appContainer'},
      act.el(RouteHandler, this.props)
    );
  }
});

module.exports = App;
