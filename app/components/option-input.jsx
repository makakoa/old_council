'use strict';

var React = require('react');
var QuestionActions = require('../actions/question-actions');

var Input = require('./input');

module.exports = React.createClass({
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

    return (
      <Input
        value={value}
        ref='input'
        placeholder={this.props.placeholder}
        inputCallback={this.handleChange} />
    );
  }
});
