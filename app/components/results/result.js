'use strict';

var _ = require('lodash');
var act = require('lib/act');
var styler = require('lib/styler');

var color = require('lib/color');
var Text = require('../text');

module.exports = act.cl({
  displayName: 'Result',

  buildResults: function(fields, index) {
    return act.el(
      'div',
      {
        key: index,
        style: styler({
          'margin-left': '20px'
        })
      },
      act.el(
        Text, {
          value: fields.option,
          style: _.extend({
            display: 'flex',
            flexGrow: 1,
            padding: '10px',
            margin: '5px',
            border: '1px solid gray',
            borderRadius: '2px',
            backgroundColor: 'white'
          }, fields.result === 'won' ? {
            backgroundColor: color.green,
            borderBottom: '1px solid'
          } : {
            color: 'gray'
          })
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
        borderRadius: '4px',
        textAlign: 'left',
        margin: '4px 0',
        padding: '5px 10px'
      })},
      act.el(Text, {
        value: this.props.prompt,
        style: {
          margin: '10px 0',
          fontSize: '16px'
        }
      }),
      optionsResults
    );
  }
});
