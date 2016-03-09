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
            margin: '10px 0 0',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center'
          })
        },

        act.el('div', { // left nav icon filler
          style: {
            width: '30px',
            height: '30px'
          }
        }),

        act.el(Text, {
          style: {
            margin: '5px 0 5px',
            fontWeight: 'bold',
            fontSize: '30px'
          },
          value: 'The Council'
        }),

        act.el(Link, {
          style: {
            fontSize: '15px',
            color: '#cceaff',
            padding: 0,
            margin: 0,
            border: 'none'
          },
          to: 'ask',
          value: 'Ask',
          ws: this.props.ws
        })
      ),

      act.el(
        'div', {
          style: {
            overflow: 'hidden',
            'margin': '10px 0',
            border: '1px solid',
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'center'
          }
        },

        act.el(Link, {
          style: {
            width: '120px',
            padding: '5px 0',
            margin: 0,
            backgroundColor: 'white',
            border: 'none',
            borderRadius: 0,
            borderRight: '1px solid'
          },
          to: 'home',
          value: 'Recent'
        }),

        act.el(Link, {
          style: {
            width: '120px',
            padding: '5px 0',
            margin: 0,
            backgroundColor: 'gray',
            borderRadius: 0,
            border: 'none'
          },
          to: 'council',
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
