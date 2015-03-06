'use strict';

var React = require('react');
var QuestionStore = require('../stores/question-store');

var OptionResult = require('./option-result');
var Link = require('./link');

var getResults = function() {
  return QuestionStore.getResults();
};

var Link = require('./link');

module.exports = React.createClass({
  displayName: 'Results',
  mixins: [QuestionStore.mixin],

  getInitialState: function() {
    return {
      time: 0,
      start: Date.now()
    };
  },

  componentDidMount: function() {
    this.time = setInterval(this.tick, 50);
  },

  componentWillUnmount: function() {
    clearInterval(this.timer);
  },

  tick: function() {
    if (new Date - this.state.start > 30000) clearInterval(this.timer);
    if(this.isMounted()){
      this.setState({
        time: new Date - this.state.start
      });
    }
  },

  storeDidChange: function() {
    if(QuestionStore.getResults()) {
      console.log('Loading results');
      clearInterval(this.timer);
      this.setState(getResults());
    }
  },

  buildResults: function(fields, index) {
    return (
      <OptionResult
        option={fields.option}
        votes={fields.votes}/>
    );
  },

  render: function() {
    var time = Math.round(this.state.time / 100);
    var seconds = (time/10).toFixed(1);
    var remaining = (30 - seconds);
    var remaining = Math.max(remaining, 0).toFixed(1);
    var header = 'Deliberation in progress...';
    var status = '';
    if (remaining > 0) {
      status = remaining + 's remaining';
    } else {
      header = 'Deliberation has concluded.'
      status = 'Waiting on report...';
    }

    if (!this.state.options) {
      this.state.options = [];
    }
    var optionsResults = this.state.options.map(this.buildResults);
    if (this.state.hasOwnProperty('prompt')){
      status = '"' + this.state.prompt + '"';
    };
    return (
      <div className='Results'>
        <h1>{header}</h1>
        <p>{status}</p>
        {optionsResults}
        <Link to='ask'>Propose another question</Link>
        <Link to='home'>Return to The Council</Link>
      </div>
    );
  }
});
