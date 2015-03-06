'use strict';

var React = require('react');
var Radium = require('radium');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  displayName: 'App',
  mixins: [Radium.StyleResolverMixin, Radium.BrowserStateMixin],

  getInitialState: function() {
    return {
      ww: window.innerWidth,
      wh: window.innerHeight
    };
  },

  componentDidMount: function () {
    var self = this;
    window.onresize = function() {
      self.setState({
        ww: window.innerWidth,
        wh: window.innerHeight
      });
    };
  },

  render: function() {
    var styles = {
      width: this.state.ww,
      height: this.state.wh
    };

    var ws = {
      ww: this.state.ww,
      wh: this.state.wh
    };
    return (
      <div className='appContainer'
        style={this.buildStyles(styles)}>
        <RouteHandler
          ws={ws}
          {...this.props} />
      </div>
    );
  }
});

module.exports = App;
