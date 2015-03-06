'use strict';

var React = require('react');
var Radium = require('radium');

module.exports = React.createClass({
  displayName: 'Button',
  mixins: [Radium.StyleResolverMixin, Radium.BrowserStateMixin],

  handleButtonClick: function() {
    this.props.buttonCallback({
      _id: this.props._id,
      key: this.props.key,
      index: this.props.index
    });
  },

  render: function() {
    var styles = {
      border: '1px solid',
      borderRadius: '2px',
      background: 'white',
      cursor: 'pointer'
    };
    return (
      <button
        _id={this.props._id}
        key={this.props.index}
        type='button'
        ref='theButton'
        {...this.getBrowserStateEvents()}
        style={this.buildStyles(styles)}
        onClick={this.handleButtonClick}>
        {this.props.value}
      </button>
    );
  }
});
