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
    var styles = {
      'font-family': '\'Raleway\', Open sans',
      'font-size': '20px',
      border: '1px solid',
      borderRadius: '5px',
      cursor: 'pointer',
      margin: '5px',
      padding: '10px'

      // modifiers: [
      //   {kind: {
      //     link: {
      //       background: '#b3b3b3'
      //     },
      //     danger: {
      //       background: '#f74a57',
      //       color: '#fff',
      //       fontSize: this.props.ws.ww/75
      //     },
      //     ask: {
      //       background: '#8aff8e',
      //       fontSize: this.props.ws.ww/25
      //     },
      //     add: {
      //       border: 0,
      //       background: 'none'
      //     }
      //   }}
      // ]
    };
    return act.el(
      'button',
      _.extend({
        _id: this.props._id,
        key: this.props.index,
        type: 'button',
        ref: 'theButton',
        style: styler(styles, this.props.style),
        onClick: this.handleButtonClick
      }),
      this.props.value
    );

  }
});
