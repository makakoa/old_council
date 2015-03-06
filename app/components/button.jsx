'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName: 'Button',

  handleButtonClick: function() {
    this.props.buttonCallback({
      _id: this.props._id,
      key: this.props.key,
      index: this.props.index
    });
  },

  render: function() {
    return (
      <button
        _id={this.props._id}
        key={this.props.index}
        type='button'
        ref='theButton'
        onClick={this.handleButtonClick}>
        {this.props.value}
      </button>
    );
  }
});
