'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName: 'CouncilListItem',

  render: function() {
    return (
      <div className='ListItem'>
        <p>{this.props.prompt}</p>
      </div>
    );
  }
});
