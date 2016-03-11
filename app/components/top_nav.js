'use strict';

var act = require('lib/act');
var styler = require('lib/styler');

var Img = require('components/img');

module.exports = act.cl({
  render: function() {
    return act.el(
      'top',
      {
        style: styler({
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          display: 'flex',
          padding: '30px 0 10px',
          backgroundColor: '#673ab7',
          borderBottom: '1px solid gray',
          justifyContent: 'space-around',
          alignItems: 'center'
        })
      },

      act.el('left-nav-icon', {
        style: {width: '15px'}
      }, this.props.leftNavIcon),

      this.props.content || act.el(Img, {
        src: 'thecouncil.png',
        style: {
          width: '170px'
        }
      }),

      act.el('right-nav-icon', {
        style: {width: '15px'}
      }, this.props.rightNavIcon)
    );
  }
});
