'use strict';

var React = require('react');
var QuestionStore = require('../stores/question-store');

var getResult = function() {
  return QuestionStore.getResult();
};

var Link = require('./link');

module.exports = React.createClass({
  displayName: 'Results',

  getInitialState: function() {
    return getResult();
  },

  buildResults: function(fields, index) {
    return (
      <OptionResult
        option={fields.option}
        votes={fields.vote}/>
    );
  },

  render: function() {
    var optionsResults = this.state.options.map(this.buildResults);
    <div className='Results'>
      <h1>The Council has concluded</h1>
      <p>"{this.state.prompt}"</p>
      {optionsResults}
      <Link to='ask'>Propose another question</Link>
      <Link to='home'>Return to The Council</Link>
    </div>
  }
});
