'use strict';

var React = require('react');
var CouncilActions = require('../actions/council-actions');

var Button = require('./button');

module.exports = React.createClass({
  displayName: 'CouncilQuestionOptions',

  vote: function(index) {
    CouncilActions.vote(index);
  },

  render: function() {
    return (
      <div className='CouncilOptions'>
        <Button
          value={this.props.value}
          key={this.props.key}
          index={this.props.key}
          buttonCallback={this.vote}/>
      </div>
    );
  }
});
