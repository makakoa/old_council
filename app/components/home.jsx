'use strict';

var React = require('react');

var Link = require('./link');
var Header = require('./header');

module.exports = React.createClass({
  displayName: 'Home',

  render: function() {
    return (
      <div>
        <Header
          ws={this.props.ws}
          value='Welcome To The Council'/>
        <Link to='ask'
          value='Seek Guidance'
          ws={this.props.ws}/>
        <br/>
        <Link to='council'
          value='Advise'
          ws={this.props.ws}/>
      </div>
    );
  }
});
