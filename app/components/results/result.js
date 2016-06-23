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
      this.props.options[index].votes
        ?
          act.el(Text, {
          value: (Math.floor((this.props.options[index].votes / this.props.total)*10000)/100) + '% votes',
          style: {
            fontFamily: 'Oxygen',
            lineHeight: '20px',
            color: 'gray'
          }
        })
      : 'council say no'
    );
  },

  render: function() {

    var options = [];
    if (this.props.options) options = this.props.options;
    var optionsResults = _.map(options, this.buildResults);

    console.log('PROPS:', this.props);

    return act.el(
      'result',
      {style: styler({
        display: 'flex',
        flexDirection: 'column',
        background: 'white',
        borderRadius: '7px',
        textAlign: 'left',
        margin: '10px 0',
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
