'use strict';

var _ = require('lodash');
var act = require('lib/act');
var styler = require('lib/styler');
var color = require('lib/color');

var QuestionActions = require('actions/question-actions');

var QuestionInput = require('./question-input');
var OptionInput = require('./option-input');
var Button = require('components/button');

module.exports = act.cl({
  dipslayName: 'AskForm',

  addOption: function() {
    return QuestionActions.createOption();
  },

  deleteOption: function(data) {
    QuestionActions.deleteOption(data.index);
  },

  buildOptions: function(fields, index) {
    return act.el(
      'div',
      _.extend({
        className: 'Option',
        style: styler({
          display: 'flex',
          alignItems: 'center'
        })
      }, this.props),
      act.el(Button, {
        buttonCallback: this.deleteOption,
        index: index,
        style: ({
          margin: '0 5px',
          padding: 0,
          lineHeight: '18px',
          fontSize: '18px',
          fontWeiht: 'bold',
          width: '20px',
          height: '20px',
          color: 'white',
          backgroundColor: color.red,
          border: 'none',
          borderRadius: '50%'
        }),
        value: '-'
      }),
      act.el(OptionInput, {
        _id: this.props._id,
        key: index,
        value: fields.option
      })
    );
  },

  render: function() {
    var OptionNodes = this.props.options.map(this.buildOptions);

    return act.el(
      'div',
      {
        className: 'askForm',
        style: styler({
          display: 'flex',
          flexDirection: 'column'
        })
      },

      act.el(QuestionInput, {
        value: this.props.prompt
      }),

      OptionNodes,

      act.el(Button, {
        buttonCallback: this.addOption,
        value: 'Add option',
        style: styler({
          'padding': '5px',
          'border-radius' :'5px',
          'background-color': 'white'
        })
      })
    );
  }
});
