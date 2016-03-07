'use strict';

var _ = require('lodash');
var act = require('lib/act');
var styler = require('lib/styler');

var SocketStore = require('../../stores/socket-store');

var Result = require('./result');
var Text = require('../text');

var getRecent = function() {
  return SocketStore.getRecent();
};

module.exports = act.cl({
  displayName: 'recent',
  mixins: [SocketStore.mixin],

  getInitialState: function() {
    return {
      recent: getRecent()
    };
  },

  storeDidChange: function() {
    this.setState({
      recent: getRecent()
    });
  },

  buildRecent: function(fields, index) {
    return act.el(Result, {
      key: index,
      ws: this.props.ws,
      options: fields.options,
      prompt: fields.prompt
    });
  },

  render: function() {
    var recent = _.map(this.state.recent, this.buildRecent);

    return act.el(
      'div',
      {
        className: 'Home',
        style: styler({display: 'inline-block'})
      },
      act.el(Text, {
        ws: this.props.ws,
        value: 'Recent'
      }),
      recent
    );
  }
});
