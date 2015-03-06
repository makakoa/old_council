'use strict';

var React = require('react');
var CouncilActions = require('../actions/council-actions');
var CouncilStore = require('../stores/council-store');

var Link = require('./link');
var CouncilList = require('./council-list-question');
var CouncilQuestion = require('./council-question');

var getQuestions = function() {
  return CouncilStore.getQuestions();
};

var getCurrent = function() {
  return CouncilStore.getCurrent();
};

module.exports = React.createClass({
  displayName: 'Council',
  mixins: [CouncilStore],

  getInitialState: function() {
    CouncilActions.loadQuestions();
    return {
      current: {
        prompt: 'Loading...',
        options: []
      },
      questions: []
    };
  },

  storeDidChange: function() {
    this.setState({
      questions: getQuestions(),
      current: getCurrent()
    });
  },

  buildList: function(fields, index) {
    return (
      <CouncilList
        key={index}
        prompt={fields.prompt}/>
    );
  },

  render: function() {
    var list = this.state.questions.map(this.buildList);
    return (
      <div className='Answerer'>
        <h1>"Council, I seek your guidance..."</h1>
        <CouncilQuestion
          _id={this.state.current._id}
          prompt={this.state.current.prompt}
          options={this.state.current.options}/>
          {list}
        <br/>
        <Link to='home'>Leave Council</Link>
      </div>
    );
  }
});
