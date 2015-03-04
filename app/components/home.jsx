'use strict';

var React = require('react');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

module.exports = React.createClass({
  displayName: 'Home',
  propTypes: {},
  mixins: [],

  getInitialState: function() {return null;},

  componentWillMount: function() {},

  componentWillUnmount: function() {},

  render: function() {
    return (
      <div>
        <p>
          home rendered
        </p>
        <RouteHandler />
      </div>
    );
  }
});
