'use strict';

var act = require('lib/act');
var styler = require('lib/styler');
var uuid = require('uuid');
var color = require('lib/color');

var QuestionStore = require('stores/question-store');
var QuestionActions = require('actions/question-actions');

var Text = require('components/text');
var Link = require('components/link');
var QuestionForm = require('./question_form');

var getState = QuestionStore.getQuestion;

module.exports = act.cl({
  displayName: 'Ask',
  mixins: [QuestionStore.mixin],

  getInitialState: function() {
    var newQuestion = {
      _id: uuid.v4(),
      prompt: null,
      time: 30000,
      options: [
        {option: 'Yes'},
        {option: 'No'},
        {option: 'Maybe'}
      ]
    };
    QuestionActions.createQuestion(newQuestion);
    this._id = newQuestion._id;
    return newQuestion;
  },

  storeDidChange: function() {
    this.setState(getState());
  },

  askQuestion: function() {
    QuestionActions.askQuestion(this.state);
  },

  render: function() {

    return act.el(
      'div',
      {
        className: 'question',
        style: styler({
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          margin: '20px 0'
        })
      },

      act.el(Text, {
        value: 'Present your situation',
        style: styler({
          textAlign: 'center',
          margin: '20px 0',
          fontSize: '20px'
        })
      }),

      act.el(QuestionForm, {
        _id: this.state._id,
        question: this.state.prompt,
        options: this.state.options
      }),

      act.el(Link, {
        to: 'results',
        linkCb: this.askQuestion,
        style: styler({
          margin: '20px 10px 0',
          backgroundColor: color.green,
          padding: '10px',
          display: 'flex',
          justifyContent: 'center',
          borderRadius: '6px'
        }),
        value: 'Ask'
      })

      // act.el(Link, {
      //   to: 'home',
      //   value: 'Nevermind'
      // })
    );
  }
});
