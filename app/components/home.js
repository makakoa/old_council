'use strict';

var act = require('lib/act');
var styler = require('lib/styler');

var SocketStore = require('../stores/socket-store');

var Link = require('./link');
var Text = require('./text');
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
          'max-width': '700px',
          'margin': '0 auto',
          padding: '10px',
          textAlign: 'center',
          display: 'flex',
          'flex-direction': 'column',
          'justify-content': 'space-around',
          'align-items': 'center'
        })
      },

      act.el(
        'top',
        {
          style: styler({
            width: '100%',
            display: 'flex',
            'justify-content': 'space-around'
          })
        },
        act.el('div', {}),

        act.el(Text, {
          style: {
            'font-weight': 'bold',
            'font-size': '40px'
          },
          value: 'The Council'
        }),

        act.el(Link, {
          style: {
            position: 'absolute',
            padding: '4px'
          },
          to: 'ask',
          value: 'Ask',
          ws: this.props.ws
        })
      ),

      act.el(
        'div', {
          style: {
            'margin-top': '10px',
            border: '1px solid',
            'border-radius': '10px',
            'background-color': 'white',
            display: 'flex',
            'justify-content': 'center'
          }
        },
        act.el(Text, {
          style: {
            padding: '7px',
            width: '150px',
            'border-right': '1px solid'
          },
          value: 'Recent'
        }),
        act.el(Text, {
          style: {
            width: '150px',
            padding: '7px'
          },
          value: 'Answer'
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

      act.el(Recent, {
        style: {
          width: '100%'
        }
      }));
  }
});
