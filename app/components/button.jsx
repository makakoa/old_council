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
    var proportion; //modifier won't scale size
    if (!this.props.proportion) {
      proportion = 1;
    } else {
      proportion = this.props.proportion;
    }

    var styles = {
      fontFamily: '\'Raleway\', Open sans',
      border: '1px solid',
      borderRadius: '2px',
      fontSize: this.props.ws.ww / 50 * proportion,
      cursor: 'pointer',
      margin: '3px',

      modifiers: [
      {kind: {
        link: {},
        danger: {
          background: '#f74a57',
          color: '#fff'
        },
        primary: {
          background: '#8aff8e'
        }
      }}
      ]
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
