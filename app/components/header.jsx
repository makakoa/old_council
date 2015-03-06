'use strict';

var React = require('react');
var Radium = require('radium');

module.exports = React.createClass({
  mixins: [Radium.StyleResolverMixin, Radium.BrowserStateMixin],

  render: function() {
    var proportion; //modifier won't scale size
    if (!this.props.proportion) {
      proportion = 1;
    } else {
      proportion = this.props.proportion;
    }

    var styles = {
      fontFamily: '\'Raleway\', Open sans',
      fontSize: (this.props.ws.ww / 20 * proportion),
      fontWeight: 'bold',
      margin: 0,
      padding: 0,
      textAlign: 'center'
    };

    return (
      <p
        style={this.buildStyles(styles)}>
      {this.props.value}
      </p>
    );
  }
});
