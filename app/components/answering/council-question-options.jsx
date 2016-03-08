'use strict';

var act = require('lib/act');
var styler = require('lib/styler');
var CouncilActions = require('../../actions/council-actions');

var Button = require('../button');

module.exports = act.cl({
  displayName: 'CouncilQuestionOptions',

  vote: function() {
    CouncilActions.vote(this.props);
  },

  render: function() {
    return act.el(Button, {
      style: styler({
        display: 'flex',
        flexGrow: 1,
        margin: '2px 2px 2px 20px',
        border: '1px solid gray',
        borderRadius: '2px',
        backgroundColor: 'white'
      }),
      value: this.props.value,
      index: this.props.index,
      _id: this.props._id,
      buttonCallback: this.vote
    });
  }
});
