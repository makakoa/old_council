'use strict';

var React = require('react');

module.exports Input = React.createClass({
  displayName: 'Input',
  propTypes: {},
  mixins: [],

  getInitialState: function() {return null;},

  componentWillMount: function() {},

  handleInputChange: function() {
    this.props.inputCallback({
      _id: this.props._id,
      accessor: this.props.accessor,
      index: this.props.index,
      value: this.refs.inputValue.getDOMNode().value
    });
  },

  componentWillUnmount: function() {},

  render: function() {
    return (
      <input
        _id={this.props._id}
        type='text'
        ref='inputValue'
        value={this.props.placeholder}
        onChange={this.handleInputChange} />
    );
  }
});
