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
        style: _.extend({
          display: 'flex',
          justifyContent: 'space-between',
          flexGrow: 1,
          padding: '10px',
          margin: '5px 5px 5px 20px',
          border: '1px solid gray',
          borderRadius: '2px',
          backgroundColor: 'white'
        }, fields.result === 'won' ? {
          backgroundColor: color.green,
          borderBottom: '1px solid'
        } : {
          color: 'gray'
        })
      },
      act.el(Text, {
        value: fields.option
      }),
      act.el(Text, {
        value: Math.floor(Math.random() * 20) + ' votes',
        style: {
          fontFamily: 'Oxygen',
          lineHeight: '20px',
          color: 'gray'
        }
      })
    );
  },

  render: function() {

    var options = [];
    if (this.props.options) options = this.props.options;
    var optionsResults = _.map(options, this.buildResults);

    return act.el(
      'result',
      {style: styler({
        display: 'flex',
        flexDirection: 'column',
        background: 'white',
        border: '1px solid black',
        borderRadius: '10px',
        textAlign: 'left',
        margin: '4px 4px',
        padding: '10px'
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
