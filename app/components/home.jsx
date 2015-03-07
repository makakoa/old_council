'use strict';

var React = require('react');
var Radium = require('radium');

var Link = require('./link');
var Header = require('./header');

module.exports = React.createClass({
  displayName: 'Home',
  mixins: [Radium.StyleResolverMixin],

  render: function() {
    var styles = {
      paddingTop: this.props.ws.wh/10,
      textAlign: 'center'
    };

    return (
      <div className='Home'
        style={this.buildStyles(styles)}>
        <Header
          ws={this.props.ws}
          value='Welcome To The Council'/>
        <br/>
        <Link to='ask'
          value='Seek Guidance'
          ws={this.props.ws}/>
        <br/>
        <br/>
        <Link to='council'
          value='Advise'
          ws={this.props.ws}/>
      </div>
    );
  }
});
