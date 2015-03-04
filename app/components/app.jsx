'use strict';

var React = require('react');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  displayName: 'App',
  propTypes: {},
  mixins: [],

  getInitialState: function() {return null;},

  componentWillMount: function() {},

  componentWillUmmount: function() {},

  render: function() {
    return (
      <div className='appContainer'>
        <RouteHandler {...this.props} />
      </div>
    );
  }
});

module.exports = App;
