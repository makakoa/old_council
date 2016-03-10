'use strict';

var act = require('lib/act');
var styler = require('lib/styler');

var Svg = require('components/svg');

module.exports = act.cl({
  render: function() {
    return act.el(
      'top',
      {
        style: styler({
          width: '100%',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'
        })
      },

      act.el('left-nav-icon', {
        style: {width: '15px'}
      }, this.props.leftNavIcon),

      this.props.content || act.el(Svg, {
        data: 'The-Council.svg',
        style: {
          width: '170px',
          margin: '20px 0'
        }
      }),

      act.el('right-nav-icon', {
        style: {width: '15px'}
      }, this.props.rightNavIcon)
    );
  }
});
