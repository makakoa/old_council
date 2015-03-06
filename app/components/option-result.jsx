'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName: 'OptionResult',

  render: function() {
    return (
      <div className='Waiting'>
        <h3>{this.props.option}:{this.props.votes}</h3>
      </div>
    );
  }
});
