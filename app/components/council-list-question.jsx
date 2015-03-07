'use strict';

var React = require('react');

var Text = require('./text');

module.exports = React.createClass({
  displayName: 'CouncilListItem',

  render: function() {
    var item = this.props.index + 1;
    item += '. ' + this.props.prompt;
    return (
      <div className='ListItem'>
        <Text
          value={item}
          ws={this.props.ws}/>
      </div>
    );
  }
});
