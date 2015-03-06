'use strict';

var React = require('react');
var Radium = require('radium');

module.exports = React.createClass({
  displayName: 'Input',
  propTypes: {},
  mixins: [Radium.StyleResolverMixin, Radium.BrowserStateMixin],

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
    var styles = {
      fontSize: 16,
      fontFamily: 'Open sans',
      margin: '5px',

      states: [
      {focus: {
        background: 'white',
        boxShadow: '0 0 0 2px #CCCCFF'
      }}
      ]
    }
    return (
      <input
        _id={this.props._id}
        type='text'
        ref='inputValue'
        value={this.props.value}
        placeholder={this.props.placeholder}
        {...this.getBrowserStateEvents()}
        style={this.buildStyles(styles)}
        onChange={this.handleInputChange} />
    );
  }
});
