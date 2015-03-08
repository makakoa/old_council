'use strict';

var React = require('react');
var Radium = require('radium');

var SocketStore = require('../stores/socket-store');

var Result = require('./result');
var Text = require('./text');

var getRecent = function() {
  return SocketStore.getRecent();
};

module.exports = React.createClass({
  displayName: 'Home',
  mixins: [Radium.StyleResolverMixin, SocketStore.mixin],

  getInitialState: function() {
    return {
      recent: getRecent()
    };
  },

  storeDidChange: function() {
    this.setState({
      recent: getRecent()
    });
  },

  buildRecent: function(fields, index) {
    return (
      <Result
        ws={this.props.ws}
        options={fields.options}
        prompt={fields.prompt}/>
    );
  },

  render: function() {
    var styles = {
      display: 'inline-block'
    };

    if (this.state.recent.length) {
      var recent = this.state.recent.map(this.buildRecent);
    }

    return (
      <div className='Home'
        style={this.buildStyles(styles)}>
        <Text
          ws={this.props.ws}
          value='Recent Questions'/>
        {recent}
      </div>
    );
  }
});
