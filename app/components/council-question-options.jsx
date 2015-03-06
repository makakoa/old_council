'use strict';

var React = require('react');
var CouncilActions = require('../actions/council-actions');

var Button = require('./button');

module.exports = React.createClass({
  displayName: 'CouncilQuestionOptions',

  vote: function() {
    CouncilActions.vote(this.props);
  },

  render: function() {
    console.log(this.props);
    return (
      <div className='CouncilOptions'>
        <Button
          value={this.props.value}
          key={this.props.key}
          index={this.props.key}
          _id={this.props._id}
          buttonCallback={this.vote}/>
      </div>
    );
  }
});
