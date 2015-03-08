'use strict';

var React = require('react');

var Link = require('./components/link');

var NotFound = React.createClass({
  displayName: '404',

  render: function() {
    return (
      <div>
        <h1>
          Page not found
        </h1>
        <Link
          to='home'
          value='Main Page'/>
      </div>
    );
  }
});

module.exports = NotFound;
