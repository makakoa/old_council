'use strict';

var React = require('react');
var Radium = require('radium');
var CouncilActions = require('../../actions/council-actions');
var CouncilStore = require('../../stores/council-store');

var Link = require('../link');
var Header = require('../header');
var CouncilQuestion = require('./council-question');
var Recent = require('../recent');

var getQuestions = function() {
  return CouncilStore.getQuestions();
};

module.exports = React.createClass({
  displayName: 'Council',
  mixins: [CouncilStore.mixin, Radium.StyleResolverMixin],

  getInitialState: function() {
    CouncilActions.loadQuestions();
    return {
      questions: []
    };
  },

  storeDidChange: function() {
    console.log('Updating from store');
    this.setState({
      questions: getQuestions()
    });
  },

  buildList: function(fields, index) {
    return (
      <CouncilQuestion
        question={index}
        index={index}
        _id={fields._id}
        ws={this.props.ws}
        prompt={fields.prompt}
        options={fields.options}/>
    );
  },

  render: function() {
    var styles = {
      textAlign: 'center',
      paddingTop: this.props.ws.wh/10
    };

    var list;
    var questions;
    if (this.state.questions.length > 0) {
      questions = this.state.questions;
    } else {
      questions = [{
        prompt: 'Waiting on requests...',
        options: [],
      }];
    }
    list = questions.map(this.buildList);

    var modWs = {
      ww: this.props.ws.ww *0.5,
      wh: this.props.wh
    };
    var half = {
      display: 'inline-block',
      width: modWs.ww,
      boxSizing: 'border-box',
      marginLeft: 'auto',
      marginRight: 'auto',
      float: 'left'
    };

    return (
      <div className='Council'
        style={this.buildStyles(styles)}>
        <Header
          ws={this.props.ws}
          value='The Council Meeting'/><br/>
        <br/>
        <Link
          ws={this.props.ws}
          to='home'
          kind='danger'
          value='Leave Council' />
        <br/>
        <div style={this.buildStyles(half)}>
          <Header
            proportion='0.5'
            ws={this.props.ws}
            value='Council Agenda'/>
          {list}
        </div>
        <Recent
          ws={modWs}
          style={this.buildStyles(half)}/>
      </div>
    );
  }
});
