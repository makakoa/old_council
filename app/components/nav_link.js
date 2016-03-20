'use strict';

var _ = require('lodash');
var act = require('lib/act');

var Link = require('./link');

module.exports = act.cl({
  render: function() {
    return act.el(Link, {
      style: _.extend({
        fontSize: '16px',
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '15px',
        color: 'white',
        padding: '0',
        margin: 0,
        border: 'none'
      }, this.props.style),
      to: this.props.to,
      value: this.props.value
    });
  }
});
