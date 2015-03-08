'use strict';

var React = require('react');
var CouncilActions = require('../../actions/council-actions');

var Button = require('../button');

module.exports = React.createClass({
  displayName: 'CouncilQuestionOptions',

  vote: function() {
    CouncilActions.vote(this.props);
    console.log('removing ' + this.props.question);
  },

  render: function() {
    return (
      <div className='CouncilOptions'>
        <Button
          ws={this.props.ws}
          value={this.props.value}
          index={this.props.index}
          _id={this.props._id}
          buttonCallback={this.vote}/>
      </div>
    );
  }
});
