'use strict';

var React = require('react');
var uuid = require('uuid');

var QuestionStore = require('../stores/question-store');
var QuestionActions = require('../actions/question-actions');

var Link = require('./link');
var AskForm = require('./ask-form');
var Button = require('./button');

var getState = function() {
  return QuestionStore.getQuestion();
};

module.exports = React.createClass({
  displayName: 'Ask',
  propTypes: {},
  mixins: [QuestionStore.mixin],

  getInitialState: function() {
    var newQuestion = {
      _id: uuid.v4(),
      prompt: null,
      time: 30000,
      options: [
        {
          option: 'Yes'
        },
        {
          option: 'No'
        },
        {
          option: 'Maybe'
        }
      ]
    };
    QuestionActions.createQuestion(newQuestion);
    this._id = newQuestion._id;
    return newQuestion;
  },

  storeDidChange: function() {
    this.setState(getState());
  },

  questionAsked: function() {
    QuestionActions.questionAsked();
  },

  render: function() {
    return (
      <div className='question'>
        <h1>Present your situation...</h1>
        <AskForm
          _id={this.state._id}
          question={this.state.question}
          options={this.state.options}/>
        <Link to='waiting'>
        <Button
          buttonCallback={this.questionAsked}
          value='Ask'/>
        </Link>

        <Link to='home'>Nevermind</Link>
      </div>
    );
  }
});
