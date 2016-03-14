'use strict';

var _ = require('lodash');
var act = require('lib/act');
var styler = require('lib/styler');

var TopNav = require('components/top_nav');

var navHeight = 65;

module.exports = act.cl({
  render: function() {
    return act.el(
      'div',
      {
        style: styler({
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          height: '100%'
        })
      },

      act.el(
        'div',
        {style: {
          height: navHeight,
          zIndex: 1
        }},
        act.el(TopNav, _.extend({
          navHeight: navHeight
        }, this.props.navOpts))
      ),

      act.el('div', {
        style: styler({
          maxWidth: '700px',
          overflow: 'scroll',
          WebkitOverflowScrolling: 'touch'
          // margin: navHeight + 'px 0',
          // height: 'calc(100% - ' + navHeight + 'px)'
        })
      }, this.props.content)
    );

  }
});
