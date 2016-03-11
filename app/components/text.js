'use strict';

var act = require('lib/act');
var styler = require('lib/styler');

module.exports = act.cl({
  render: function() {
    return act.el(
      'text',
      {
        style: styler({
          'font-size': '14px',
          margin: 0,
          padding: 0
        }, this.props.style)
      },
      this.props.value
    );
  }
});
