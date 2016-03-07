'use strict';

var act = require('lib/act');
var styler = require('lib/styler');

var SocketStore = require('../stores/socket-store');

var Link = require('./link');
// var Text = require('./text');
var Header = require('./header');
var Recent = require('./results/recent');

function getOnlineCount() {
  return SocketStore.getOnline();
}

module.exports = act.cl({
  displayName: 'Home',

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
    // var online = 'Online: ' + this.state.online;

    return act.el(
      'home',
      {
        className: 'Home',
        style: styler({
          padding: '10px',
          textAlign: 'center',
          display: 'flex',
          'flex-direction': 'column',
          'justify-content': 'space-around'
        })
      },

      act.el(
        'div',
        {
          style: styler({
            display: 'flex',
            'justify-content': 'center'
          })
        },
        act.el(
          Header,
          {
            ws: this.props.ws,
            value: 'The Council'
          }),

        act.el(
          Link,
          {
            to: 'ask',
            value: 'Ask',
            ws: this.props.ws
          })
      ),

      // act.el(
      //   link,
      //   {
      //     to: 'council',
      //     value: 'Advise',
      //     ws: this.props.ws
      //   }),
      // act.el('br'),
      // act.el('br'),

      // act.el(
      //   link,
      //   {
      //     to: 'about',
      //     value: 'What is this?',
      //     ws: this.props.ws
      //   }),
      // act.el('br'),
      // act.el('br'),

      // act.el(
      //   text,
      //   {
      //     ws: this.props.ws,
      //     value: online
      //   }),

      act.el(
        Recent,
        {
          ws: this.props.ws
        }));
  }
});
