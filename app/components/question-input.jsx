'use strict';

var React = require('react');
var QuestionActions = require('../actions/question-actions');

var Input = require('./input');

module.exports = React.createClass({
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

    return (
      <Input
        ws={this.props.ws}
        value={value}
        ref='input'
        placeholder='Question'
        inputCallback={this.handleChange} />
    );
  }
});
