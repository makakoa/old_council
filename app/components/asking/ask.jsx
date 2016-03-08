'use strict';

var act = require('lib/act');
var styler = require('lib/styler');
var uuid = require('uuid');

var QuestionStore = require('stores/question-store');
var QuestionActions = require('actions/question-actions');

var Text = require('components/text');
var Link = require('components/link');
var AskForm = require('./ask-form');

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
          margin: '0 auto',
          fontSize: '20px'
        })
      }),

      act.el(AskForm, {
        _id: this.state._id,
        questin: this.state.question,
        options: this.state.options
      }),

      act.el(Link, {
        to: 'results',
        linkCb: this.askQuestion,
        style: styler({
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
