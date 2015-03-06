'use strict';

var React = require('react');

var Link = require('./link');;

module.exports = React.createClass({
  displayName: 'Home',
  propTypes: {},
  mixins: [],

  getInitialState: function() {return null;},

  componentWillMount: function() {},

  componentWillUnmount: function() {},

  render: function() {
    return (
      <div>
        <h1>Welcome To The Council</h1>
        <Link to='ask'>Seek Guidance</Link>
        <br/>
        <Link to='council'>Advise</Link>
      </div>
    );
  }
});
