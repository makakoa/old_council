'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName: 'Button',
  propTypes: {},
  mixins: [],

  getInitialState: function() {return null;},

  componentWillMount: function() {},

  handleButtonClick: function() {
    this.props.buttonCallback(
      this.props._id,
      this.props.accessor,
      this.props.index
    );
  },

  componentWillUnmount: function() {},

  render: function() {
    return (
      <button
        _id={this.props._id}
        type='button'
        ref='theButton'
        onClick={this.handleButtonClick}>
        {this.props.value}
      </button>
    );
  }
});
