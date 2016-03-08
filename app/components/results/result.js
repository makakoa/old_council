'use strict';

var _ = require('lodash');
var act = require('lib/act');
var styler = require('lib/styler');

// var OptionResult = require('./option-result');
var Text = require('../text');

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
            borderBottom: '1px solid'
          } : {
            color: 'gray'
          }
        }
      ));
  },

  render: function() {

    var options = [];
    if (this.props.options) options = this.props.options;
    var optionsResults = _.map(options, this.buildResults);

    return act.el(
      'result',
      {style: styler({
        display: 'block',
        background: 'white',
        border: '1px solid black',
        borderRadius: '10px',
        textAlign: 'left',
        margin: '4px 4px',
        padding: '5px 10px'
      })},
      act.el(Text, {
        value: this.props.prompt,
        style: {
          fontSize: '16px'
        }
      }),
      optionsResults
    );
  }
});
