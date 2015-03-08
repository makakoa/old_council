'use strict';

var React = require('react');
var Radium = require('radium');
var QuestionStore = require('../../stores/question-store');

var Link = require('../link');
var Header = require('../header');
var Result = require('./result');
var Recent = require('./recent');

var getResults = function() {
  return QuestionStore.getResults();
};

module.exports = React.createClass({
  displayName: 'Results',
  mixins: [QuestionStore.mixin, Radium.StyleResolverMixin],

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
        ws={this.props.ws}
        option={fields.option}
        result={fields.result}/>
    );
  },

  render: function() {
    var styles = {
      textAlign: 'center',
      paddingTop: this.props.ws.wh/10
    };

    var time = Math.round(this.state.time / 100);
    var seconds = (time/10).toFixed(1);
    var remaining = (30 - seconds);
    var remaining = Math.max(remaining, 0).toFixed(1);

    var header = '';
    var status = '';
    if (remaining > 0 && !this.state.hasOwnProperty('prompt')) {
      header = 'Deliberation in progress...';
      status = remaining + 's remaining';
    } else {
      header = 'Deliberation has concluded.'
      status = 'Waiting on report...';
    }

    var options = [];
    if (this.state.options) options = this.state.options;
    var optionsResults = options.map(this.buildResults);
    if (this.state.hasOwnProperty('prompt')){
      status = this.state.prompt;
    };

    return (
      <div className='Results'
        style={this.buildStyles(styles)}>
        <Header
          ws={this.props.ws}
          value={header}/>
        <Result
          ws={this.props.ws}
          prompt={status}
          options={this.state.options}/>
          <br/>
        <Link
          ws={this.props.ws}
          to='ask'
          value='Propose another question'/>
        <Link
          ws={this.props.ws}
          to='home'
          value='Return to The Council' />
          <br/>
          <br/>
        <Recent
          ws={this.props.ws} />
      </div>
    );
  }
});
