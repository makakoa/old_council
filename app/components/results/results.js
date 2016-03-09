'use strict';

var act = require('lib/act');
var styler = require('lib/styler');
var bs = require('lib/base_styles');

var QuestionStore = require('stores/question-store');

var Link = require('components/link');
var Text = require('components/text');
var Result = require('./result');
var Recent = require('./recent');

var getResults = QuestionStore.getResults;

module.exports = act.cl({
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
    if (Date.now() - this.state.start > 30000) clearInterval(this.timer);
    if (this.isMounted()) {
      this.setState({
        time: Date.now() - this.state.start
      });
    }
  },

  storeDidChange: function() {
    if (QuestionStore.getResults()) {
      clearInterval(this.timer);
      this.setState(getResults());
    }
  },

  render: function() {

    var time = Math.round(this.state.time / 100);
    var seconds = (time/10).toFixed(1);
    var remaining = (30 - seconds);
    remaining = Math.max(remaining, 0).toFixed(1);

    var header = '';
    var status = '';
    if (remaining > 0 && !this.state.hasOwnProperty('prompt')) {
      header = 'Deliberation in progress...';
      status = remaining + 's remaining';
    } else {
      header = 'Deliberation has concluded.';
      status = 'Waiting on report...';
    }

    var options = [];
    if (this.state.options) options = this.state.options;
    if (this.state.hasOwnProperty('prompt')){
      status = this.state.prompt;
    }

    return act.el(
      'div',
      {
        className: 'Results',
        style: styler({
          display: 'flex',
          flexDirection: 'column',
          padding: '10px'
        })
      },

      act.el(Text, {
        value: header,
        style: styler({
          fontSize: '20px',
          margin: '20px auto'
        })
      }),

      act.el(Result, {
        prompt: status,
        options: this.state.options
      }),

      act.el(Link, {
        to: 'ask',
        value: 'Propose another question',
        style: styler(bs.button, {
          backgroundColor: 'white'
        })
      }),

      act.el(Link, {
        to: 'home',
        value: 'Return to The Council',
        style: styler(bs.button, {
          backgroundColor: 'white'
        })
      }),

      act.el(Text, {
        value: 'Recently asked questions',
        style: styler({
          fontSize: '16px',
          margin: '20px auto 10px'
        })
      }),

      act.el(Recent)
    );
  }
});
