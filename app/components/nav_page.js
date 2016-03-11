'use strict';

var act = require('lib/act');
var styler = require('lib/styler');

var TopNav = require('components/top_nav');

module.exports = act.cl({
  render: function() {
    return act.el(
      'div',
      {
        style: styler({
          height: '100%'
        })
      },

      act.el(TopNav, this.props.navOpts),

      act.el('div', {
        style: styler({
          '-webkit-overflow-scrolling': 'touch',
          margin: '65px 0 0'
        })
      }, this.props.content)
    );

  }
});
