'use strict';

var _ = require('lodash');
var act = require('lib/act');
var styler = require('lib/styler');

module.exports = act.cl({
  displayName: 'Button',

  handleButtonClick: function() {
    this.props.buttonCallback({
      _id: this.props._id,
      key: this.props.key,
      index: this.props.index
    });
  },

  render: function() {
    return act.el(
      'button',
      _.extend({
        _id: this.props._id,
        key: this.props.index,
        type: 'button',
        ref: 'theButton',
        style: styler({
          fontSize: '16px',
          border: '1px solid',
          borderRadius: '5px',
          cursor: 'pointer',
          margin: '5px',
          padding: '10px'
        }, this.props.style),
        onClick: this.handleButtonClick
      }),
      this.props.value
    );

  }
});
