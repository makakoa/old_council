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
  mixins: [CouncilStore.mixin],

  getInitialState: function() {
    CouncilActions.loadQuestions();
    return {
      _id: '',
      current: {
        prompt: 'Loading...',
        options: []
      },
      questions: []
    };
  },

  storeDidChange: function() {
    console.log('Updating from store');
    var list = getQuestions();
    var single = getCurrent();
    console.log('View current: ' + JSON.stringify(single));
    this.setState({
      questions: list,
      current: single
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
    var current;
    var list;
    if (this.state.questions.length > 0) {
      console.log('Assembling list: ' + this.state.questions.length);
      current = this.state.current;
      list = this.state.questions.map(this.buildList);
    } else {
      current = {
        prompt: 'Waiting on requests...',
        options: [],
        _id: ''
      };
    }
    console.log('Current: ' + JSON.stringify(current));
    return (
      <div className='Answerer'>
        <h1>"Council, I seek your guidance..."</h1>
        <CouncilQuestion
          _id={current._id}
          prompt={current.prompt}
          options={current.options}/>
          <h3>Other Pressing Issues</h3>
          {list}
        <br/>
        <Link to='home'>Leave Council</Link>
      </div>
    );
  }
});
