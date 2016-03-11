'use strict';

var act = require('lib/act');
var styler = require('lib/styler');

var Link = require('react-router').Link;

module.exports = act.cl({

  handleClick: function() {
    console.log('Routing to ' + this.props.to);
    if (this.props.linkCb) this.props.linkCb();
  },

  render: function() {

    return act.el(
      Link,
      {
        to: this.props.to,
        style: styler({
          color: 'black',
          fontSize: '16px',
          cursor: 'pointer',
          textDecoration: 'none'
        }, this.props.style),
        onClick: this.handleClick
      },
      this.props.value
    );
  }
});
