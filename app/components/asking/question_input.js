'use strict';

var act = require('lib/act');
var styler = require('lib/styler');

var QuestionActions = require('actions/question-actions');

var Input = require('components/input');

module.exports = act.cl({
  displayName: 'QuestionInput',

  getInitialState: function() {
    return {
      value: null
    };
  },

  handleChange: function() {
    var newValue = this.refs.input.getDOMNode().value;

    QuestionActions.updatePrompt({
      _id: this.props._id,
      value: newValue
    });
  },

  render: function() {
    var value = this.state.value || this.props.value;

    return act.el(Input, {
      style: styler({
        padding: '10px',
        margin: '5px 0 0',
        flexGrow: 1
      }),
      value: value,
      ref: 'input',
      placeholder: 'Question',
      inputCallback: this.handleChange
    });
  }
});
