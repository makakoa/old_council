'use strict';

var React = require('react');

var Router = require('react-router');

module.exports = React.createClass({
  displayName: 'Waiting',

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
    this.setState({
      time: new Date - this.state.start
    });
  },

  storeDidChange: function() {
    if(QuestionStore.getResults()) Router.transitionTo('results');
  },

  render: function() {
    var time = Math.round(this.state.time / 100);
    var seconds = (time/10).toFixed(1);
    var remaining = (30 - seconds);
    var remaining = Math.max(remaining, 0).toFixed(1);
    var status = '';
    var header = 'Deliberation in progress...';
    if (remaining > 0) {
      status = remaining + 's remaining';
    } else {
      header = 'Deliberation has concluded.'
      status = 'Waiting on report...';
    }
    return (
      <div className='Waiting'>
        <h3>{header}</h3>
        <p>{status}</p>
      </div>
    );
  }
});
