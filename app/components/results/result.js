'use strict';

var _ = require('lodash');
var act = require('lib/act');
var styler = require('lib/styler');

var OptionResult = require('./result-option');
// var Text = require('../text');
var Header = require('../header');

module.exports = act.cl({
  displayName: 'Result',

  buildResults: function(fields) {
    return act.el(
      OptionResult,
      {
        ws: this.props.ws,
        option: fields.option,
        result: fields.result
      }
    );
  },

  render: function() {
    var styles = {
      background: '#FFFFF0',
      border: '1px solid black',
      borderRadius: '10px',
      // width: this.props.ws.ww * 0.5,
      'text-align': 'left',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '5px',
      margin: '20px',
      padding: '10px'
    };

    var options = [];
    if (this.props.options) options = this.props.options;
    var optionsResults = _.map(options, this.buildResults);

    return act.el(
      'div',
      {
        className: 'Result',
        style: styler(styles)
      },
      act.el(
        Header,
        {
          ws: this.props.ws,
          proportion: 0.5,
          value: this.props.prompt
        }),
      optionsResults
    );
  }
});
