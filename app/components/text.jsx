'use strict';

var React = require('react');
var Radium = require('radium');

module.exports = React.createClass({
  mixins: [Radium.StyleResolverMixin],

  render: function() {
    var styles = {
      fontFamily: '\'Raleway\', Open sans',
      fontSize: this.props.ws.ww / 40,
      margin: 0,
      padding: 0,

      modifiers: [{
        fStyle: {
          bold: {fontWeight: 'bold'},
          italic: {fontStyle: 'italic'}
        }
      }]
    };

    return (
      <p
        style={this.buildStyles(styles)}>
      {this.props.value}
      </p>
    );
  }
});
