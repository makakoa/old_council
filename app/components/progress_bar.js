'use strict';

var act = require('lib/act');
var styler = require('lib/styler');

var color = require('lib/color');

module.exports = act.cl({
  render: function() {
    return act.el(
      'progress-bar',
      {
        style: styler({
          display: 'flex',
          overflow: 'hidden',
          borderRadius: '7px',
          height: '20px',
          width: '100%',
          backgroundColor: 'gray'
        }, this.props.style)
      },
      act.el('bar', {
        style: styler({
          height: '100%',
          borderRadius: '7px',
          width: this.props.progress * 100 + '%',
          backgroundColor: color.green
        })
      })
    );
  }
});
