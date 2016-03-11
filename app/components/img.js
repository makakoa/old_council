'use strict';

var act = require('lib/act');
var styler = require('lib/styler');

module.exports = act.cl({
  render: function() {
    return act.el('img', {
      style: styler(this.props.style),
      src: this.props.src
    });
  }
});
