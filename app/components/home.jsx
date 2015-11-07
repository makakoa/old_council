'use strict';

var React = require('react');
var Radium = require('radium');

var SocketStore = require('../stores/socket-store');

var Link = require('./link');
var Header = require('./header');
var Text = require('./text');
var Recent = require('./results/recent');

var getOnline = function() {
  return SocketStore.getOnline();
};

module.exports = React.createClass({
  displayName: 'Home',
  mixins: [Radium.StyleResolverMixin, SocketStore.mixin],

  getInitialState: function() {
    return {
      online: getOnline()
    };
  },

  storeDidChange: function() {
    this.setState({
      online: getOnline()
    });
  },

  render: function() {
    var styles = {
      paddingTop: this.props.ws.wh/10,
      paddingBottom: this.props.ws.wh/10,
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'space-around'
    };

    var online = 'Online: ' + this.state.online;

    return (
      <div className='Home'
        style={this.buildStyles(styles)}>
        <div>
        <Header
          ws={this.props.ws}
          value='The Council'/>
        <br/>
        <Link to='ask'
          value='Seek Guidance'
          ws={this.props.ws}/>
        <br/>
        <br/>
        <Link to='council'
          value='Advise'
          ws={this.props.ws}/>
        <br/>
        <br/>
        <Link to='about'
          value='What is this?'
          ws={this.props.ws}/>
        <br/>
        <br/>
        <Text
          ws={this.props.ws}
          value={online}/>
        <br/>
        </div>
        <div>
        <Recent
          ws={this.props.ws}/>
          </div>
      </div>
    );
  }
});
