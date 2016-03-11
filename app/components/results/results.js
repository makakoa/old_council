'use strict';

var act = require('lib/act');
var styler = require('lib/styler');
var bs = require('lib/base_styles');

var QuestionStore = require('stores/question-store');

var NavPage = require('components/nav_page');
var ProgressBar = require('components/progress_bar');
var Svg = require('components/svg');
var Link = require('components/link');
var Text = require('components/text');
var Result = require('./result');
// var Recent = require('./recent');

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
    this.timer = setInterval(this.tick, 50);
  },

  componentWillUnmount: function() {
    clearInterval(this.timer);
  },

  tick: function() {
    if (Date.now() - this.state.start > 30000) this.stop();
    if (this.isMounted()) {
      this.setState({
        time: Date.now() - this.state.start
      });
    }
  },

  stop: function() {
    window.clearInterval(this.timer);
  },

  storeDidChange: function() {
    if (QuestionStore.getResults()) {
      this.stop();
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
    if (this.state.hasOwnProperty('prompt')) {
      status = this.state.prompt;
    }

    return act.el(NavPage, {
      navOpts: {},
      content: act.el(
        'div',
        {
          className: 'Results',
          style: styler({
            display: 'flex',
            flexDirection: 'column',
            padding: '10px'
          })
        },

        act.el(Svg, {
          data: 'council.svg',
          style: {
            margin: '40px 0 0'
          }
        }),

        act.el(Text, {
          value: header,
          style: styler({
            color: 'white',
            fontSize: '20px',
            textAlign: 'center',
            margin: '20px 0 0'
          })
        }),

        act.el(ProgressBar, {
          progress: (seconds / 30),
          style: {
            margin: '10px 0'
          }
        }),

        act.el(Result, {
          prompt: status,
          votes: this.state.votes,
          options: this.state.options
        }),

        act.el(Link, {
          to: 'ask',
          value: 'Propose another question',
          style: styler(bs.button, {
            margin: '10px 0 0',
            backgroundColor: 'white'
          })
        }),

        act.el(Link, {
          to: 'home',
          value: 'Return to The Council',
          style: styler(bs.button, {
            margin: '10px 0 0',
            backgroundColor: 'white'
          })
        })

      )
    });
  }
});
