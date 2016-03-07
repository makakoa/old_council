'use strict';

var act = require('lib/act');
var _ = require('lodash');
var Link = require('react-router').Link;

var Button = require('./button');

module.exports = act.cl({
  render: function() {
    var linkCb = this.props.linkCb
          ? this.props.linkCb
          : function() {
            console.log('Routing to ' + this.props.to);
          };
    return act.el(
      Link,
      {to: this.props.to},
      act.el(
        Button,
        _.extend({
          kind: 'link',
          buttonCallback: linkCb
        }, this.props)));
  }
});
