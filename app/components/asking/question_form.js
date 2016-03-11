'use strict';

var _ = require('lodash');
var act = require('lib/act');
var styler = require('lib/styler');
var color = require('lib/color');

var QuestionActions = require('actions/question-actions');

var QuestionInput = require('./question_input');
var OptionInput = require('./option_input');
var Button = require('components/button');

module.exports = act.cl({
  dipslayName: 'QuestionForm',

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
          margin: '10px 0 0',
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
        index: index,
        style: styler({
          margin: '0'
        }),
        value: fields.option
      })
    );
  },

  render: function() {
    var OptionNodes = this.props.options.map(this.buildOptions);

    return act.el(
      'div',
      {
        className: 'questionForm',
        style: styler({
          margin: '0 10px',
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
          'padding': '10px',
          border: 'none',
          margin: '10px 0 0',
          borderRadius :'5px',
          backgroundColor: 'white'
        })
      })
    );
  }
});
