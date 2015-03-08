'use strict';

var React = require('react');
var uuid = require('uuid');
var Radium = require('radium');

var QuestionStore = require('../../stores/question-store');
var QuestionActions = require('../../actions/question-actions');

var Link = require('../link');
var AskForm = require('./ask-form');
var Button = require('../button');
var Header = require('../header');

var getState = function() {
  return QuestionStore.getQuestion();
};

module.exports = React.createClass({
  displayName: 'Ask',
  propTypes: {},
  mixins: [QuestionStore.mixin, Radium.StyleResolverMixin],

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

  askQuestion: function() {
    QuestionActions.askQuestion(this.state);
  },

  render: function() {
    var styles = {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingTop: this.props.ws.wh / 10,
      textAlign: 'center'
    }
    return (
      <div className='question'
        style={this.buildStyles(styles)}>
        <Header
          value='Present your situation.'
          ws={this.props.ws}/>
        <AskForm
          _id={this.state._id}
          question={this.state.question}
          options={this.state.options}
          ws={this.props.ws}/>
        <Link
          to='results'
          linkCb={this.askQuestion}
          kind='ask'
          value='Ask'
          ws={this.props.ws}/>
        <br/>
        <Link
          to='home'
          value='Nevermind'
          ws={this.props.ws}/>
      </div>
    );
  }
});
