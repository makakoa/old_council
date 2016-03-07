'use strict';

var _ = require('lodash');
var act = require('lib/act');
var styler = require('lib/styler');

// var OptionResult = require('./option-result');
var Text = require('../text');
var Header = require('../header');

module.exports = act.cl({
  displayName: 'Result',

  buildResults: function(fields) {
    return act.el(
      'div',
      {
        style: styler({
          'margin-left': '20px'
        })
      },
      act.el(
        Text, {
          value: fields.option,
          style: fields.result === 'won' ? {
            'border-bottom': '1px solid'
          } : {
            color: 'gray'
          }
        }
      ));
  },

  render: function() {
    var styles = {
      display: 'block',
      background: '#FFFFF0',
      border: '1px solid black',
      borderRadius: '10px',
      'text-align': 'left',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '5px',
      margin: '20px',
      padding: '10px 20px'
    };

    var options = [];
    if (this.props.options) options = this.props.options;
    var optionsResults = _.map(options, this.buildResults);

    return act.el(
      'result',
      {style: styler(styles)},
      act.el(Header, {value: this.props.prompt}),
      optionsResults
    );
  }
});
