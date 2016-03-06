'use strict';

var act = require('lib/act');
var styler = require('lib/styler');

var SocketStore = require('../stores/socket-store');

var Link = require('./link');
var Text = require('./text');
var Header = require('./header');
var Recent = require('./results/recent');

function getOnlineCount() {
  return SocketStore.getOnline();
}

module.exports = act.cl({
  displayName: 'Home',
  mixins: [styler],

  getInitialState: function() {
    return {
      online: getOnlineCount()
    };
  },

  storeDidChange: function() {
    this.setState({
      online: getOnlineCount()
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

    return act.el(
      'div',
      {
        className: 'Home',
        style: this.buildStyles(styles)
      },
      act.el(
        'div',
        null,
        act.el(
          Header,
          {
            ws: this.props.ws,
            value: 'The Council'
          }),
        act.el('br'),

        act.el(
          Link,
          {
            to: 'ask',
            value: 'Seek Guidance',
            ws: this.props.ws
          }),
        act.el('br'),
        act.el('br'),

        act.el(
          Link,
          {
            to: 'council',
            value: 'Advise',
            ws: this.props.ws
          }),
        act.el('br'),
        act.el('br'),

        act.el(
          Link,
          {
            to: 'about',
            value: 'What is this?',
            ws: this.props.ws
          }),
        act.el('br'),
        act.el('br'),

        act.el(
          Text,
          {
            ws: this.props.ws,
            value: online
          }),
        act.el('br')
      ),
      act.el(
        'div',
        null,
        act.el(
          Recent,
          {
            ws: this.props.ws
          }))
    );
  }
});
