'use strict';

var _ = require('lodash');
var act = require('lib/act');
var styler = require('lib/styler');

var Choice = require('./council-question-options');
var Text = require('../text');

module.exports = act.cl({
  displayName: 'CouncilQuestion',

  buildChoiceList: function(fields, index) {
    return act.el(Choice, {
      ws: this.props.ws,
      _id: this.props._id,
      index: index,
      question: this.props.question,
      value: fields.option
    });
  },

  render: function() {
    var choices = _.map(this.props.options, this.buildChoiceList);

    return act.el(
      'div',
      {
        className: 'CouncilQuestion',
        style: styler({
          display: 'flex',
          flexDirection: 'column',
          background: 'white',
          border: '1px solid black',
          borderRadius: '10px',
          textAlign: 'left',
          margin: '4px 4px',
          padding: '10px'
        })
      },
      act.el(Text, {
        value: this.props.prompt,
        style: styler({
          margin: '4px 0',
          fontSize: '16px'
        })
      }),
      choices
    );
  }
});
