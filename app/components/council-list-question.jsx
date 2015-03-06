'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName: 'CouncilListItem',

  render: function() {
    var place = this.props.index + 1;
    place += '. ';
    return (
      <div className='ListItem'>
        <p>{place}{this.props.prompt}</p>
      </div>
    );
  }
});
