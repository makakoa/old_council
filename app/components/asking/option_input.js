'use strict';

var act = require('lib/act');
var styler = require('lib/styler');

var QuestionActions = require('actions/question-actions');

var Input = require('components/input');

module.exports = act.cl({
  displayName: 'OptionInput',

  getInitialState: function() {
    return {
      value: null
    };
  },

  handleChange: function() {
    var newValue = this.refs.input.getDOMNode().value;
    QuestionActions.updateOption({
      _id: this.props._id,
      index: this.props.index,
      value: newValue
    });
  },

  render: function() {
    var value = this.state.value || this.props.value;

    return act.el(Input, {
      style: styler({
        padding: '10px',
        flexGrow: 1
      }),
      value: value,
      ref: 'input',
      placeholder: 'Option',
      inputCallback: this.handleChange
    });
  }
});
