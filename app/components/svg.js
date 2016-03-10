'use strict';

var act = require('lib/act');
var styler = require('lib/styler');

module.exports = act.cl({
  render: function(){
    return act.el('object', {
      type: 'image/svg+xml',
      style: styler(this.props.style),
      data: this.props.data
    });
  }
});
